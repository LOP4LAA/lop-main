import { useState, useEffect } from "react"
import { authService } from "@/services/authServices"
import { z } from "zod"
import toast from "react-hot-toast"
import { GenericError } from "@/types"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

export default function useActivateReader() {
  const { activateReaderDto } = authService
  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState(true)

  const { token } = useParams() ?? ""

  const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#.]/, { message: "Password must contain at least one special character" })

  const passwordValidationSchema = z
    .object({
      new_password: passwordSchema,
      confirm_new_password: passwordSchema,
    })
    .refine((data) => data.new_password === data.confirm_new_password, {
      message: "Passwords do not match",
      path: ["confirm_new_password"],
    })

  const [formValues, setFormValues] = useState({
    new_password: "",
    confirm_new_password: "",
  })

  const [formErrors, setFormErrors] = useState<{ new_password?: string; confirm_new_password?: string }>({})

  const validateForm = () => {
    try {
      passwordValidationSchema.parse(formValues)
      setFormErrors({})
      return true
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors
        setFormErrors({
          new_password: errors.new_password?.[0],
          confirm_new_password: errors.confirm_new_password?.[0],
        })
      }
      return false
    }
  }

  const { mutate: activateReaderMutate, status: activateReaderStatus } = useMutation({
    mutationFn: activateReaderDto,
    onSuccess: (response: any) => {
      toast.success(response?.data?.message)
      setFormErrors({})
      navigate("/login")
    },
    onError: (error: GenericError) => {
      toast.error(error?.response?.data.message)
    },
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleChangePassword = async (e: any) => {
    e.preventDefault()
    const payload = {
      ...formValues,
      token,
    }

    if (validateForm()) {
      activateReaderMutate(payload)
    }
  }

  useEffect(() => {
    const hasErrors = Object.keys(formErrors).length > 0
    const hasEmptyFields = !formValues.new_password || !formValues.confirm_new_password
    const passwordsMismatch = formValues.new_password !== formValues.confirm_new_password

    setIsDisabled(hasErrors || hasEmptyFields || passwordsMismatch)
    setFormErrors({})
  }, [formValues])

  return { formValues, formErrors, handleInputChange, handleChangePassword, activateReaderStatus, isDisabled }
}
