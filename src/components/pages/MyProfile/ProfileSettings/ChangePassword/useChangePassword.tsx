import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { profileService } from "../../../../../services/profileServices"
import { z } from "zod"
import { logoutUser } from "../../../../../utils/fn"

export default function useChangePassword() {
  const navigate = useNavigate()
  const { updateUserPasswordDto } = profileService

  const [formValues, setFormValues] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  })

  const [isDisabled, setIsDisabled] = useState(true)

  const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#.]/, { message: "Password must contain at least one special character" })

  const passwordValidationSchema = z
    .object({
      current_password: z.string(),
      new_password: passwordSchema,
      confirm_new_password: passwordSchema,
    })
    .refine((data) => data.new_password === data.confirm_new_password, {
      message: "Passwords do not match",
      path: ["confirm_new_password"],
    })
    .refine((data) => data.new_password !== data.current_password, {
      message: "New password must be different from the current password",
      path: ["new_password"],
    })

  const [formErrors, setFormErrors] = useState<{
    current_password?: string
    new_password?: string
    confirm_new_password?: string
  }>({})

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

  const { mutate: updatePasswordMutation, status: isUpdatingPassword } = useMutation({
    mutationFn: updateUserPasswordDto,
    onSuccess: (response) => {
      toast.success(response?.data?.message)
      logoutUser()
      navigate("/login")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message)
    },
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleChangePassword = async (e: any) => {
    e.preventDefault()

    if (validateForm()) {
      updatePasswordMutation(formValues)
    }
  }

  useEffect(() => {
    const hasErrors = Object.keys(formErrors).length > 0
    const hasEmptyFields = !formValues.new_password || !formValues.confirm_new_password || !formValues.current_password
    const passwordsMismatch = formValues.new_password !== formValues.confirm_new_password

    setIsDisabled(hasErrors || hasEmptyFields || passwordsMismatch)
    setFormErrors({})
  }, [formValues])

  return {
    formValues,
    formErrors,
    handleInputChange,
    handleChangePassword,
    isLoading: isUpdatingPassword === "pending",
    isDisabled,
  }
}
