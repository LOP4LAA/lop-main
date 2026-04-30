import { useState } from "react"
import { authService } from "../../../services/authServices"
import { z } from "zod"
import toast from "react-hot-toast"
import { GenericError } from "../../../types"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

export default function useChangePassword() {
  const { resetPasswordDto } = authService
  const navigate = useNavigate()

  const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#.]/, { message: "Password must contain at least one special character" })

  const passwordValidationSchema = z
    .object({
      new_password: passwordSchema,
      confirm_password: passwordSchema,
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
    })

  const [formValues, setFormValues] = useState({
    new_password: "",
    confirm_password: "",
  })

  const [formErrors, setFormErrors] = useState<{ new_password?: string; confirm_password?: string }>({})

  const hash = localStorage.getItem("hash-id-key") || ""

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
          confirm_password: errors.confirm_password?.[0],
        })
      }
      return false
    }
  }

  const { mutate: resetPasswordMutate, status: resetPasswordStatus } = useMutation({
    mutationFn: resetPasswordDto,
    onSuccess: (response: any) => {
      toast.success(response?.data?.message)
      setFormErrors({})
      navigate("/login")
      localStorage.removeItem("hash-id-key")
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

    if (validateForm()) {
      resetPasswordMutate({ ...formValues, hash })
    }
  }

  const isDisabled = () => {
    const hasErrors = Object.keys(formErrors).length > 0
    const hasEmptyFields = !formValues.new_password || !formValues.confirm_password
    const passwordsMismatch = formValues.new_password !== formValues.confirm_password

    return hasErrors || hasEmptyFields || passwordsMismatch
  }

  return { formValues, formErrors, handleInputChange, handleChangePassword, resetPasswordStatus, isDisabled }
}
