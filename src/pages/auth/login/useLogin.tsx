import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { authService } from "../../../services/authServices"
import { GenericError } from "../../../types"

export default function useLogin() {
  const { loginDto } = authService
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  })

  const {
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: formValues,
  })

  const validateForm = () => {
    try {
      loginSchema.parse(formValues)
      setFormErrors({})
      return true
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors
        setFormErrors({
          email: errors.email?.[0],
          password: errors.password?.[0],
        })
      }
      return false
    }
  }

  const { mutate, status } = useMutation({
    mutationFn: loginDto,
    onSuccess: (response: any) => {
      const isActivated = response?.data?.data?.is_activated
      const userProfile = response?.data?.data
      const token = response?.data?.data?.token

      if (isActivated) {
        localStorage.setItem("lop-token", token)
        localStorage.setItem("profile", JSON.stringify(userProfile))
        navigate("/dashboard")
      } else {
        localStorage.setItem("change_password_token", token)
        navigate(`/change-password?email=${formValues.email}`)
      }
      toast.success("Login successful")
      setFormValues({ email: "", password: "" })
      setFormErrors({})
    },
    onError: (error: GenericError) => {
      toast.error(error?.response?.data.message)
    },
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleLoginUser = async (e: any) => {
    e.preventDefault()
    console.log(formValues)
    if (validateForm()) {
      mutate(formValues)
    }
  }

  const isDisabled = () => {
    const hasErrors = Object.keys(errors).length > 0
    const hasEmptyFields = !formValues.email || !formValues.password
    return hasErrors || hasEmptyFields || status === "pending"
  }

  return {
    handleLoginUser,
    status,
    formValues,
    handleInputChange,
    formErrors,
    errors,
    isDisabled,
  }
}
