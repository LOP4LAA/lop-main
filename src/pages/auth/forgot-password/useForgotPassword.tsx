import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { GenericError } from "../../../types"
import { authService } from "../../../services/authServices"

export default function useForgotPassword() {
  const navigate = useNavigate()
  const { forgetPasswordDto } = authService

  const [formValues, setFormValues] = useState({
    email: "",
  })

  const [formErrors, setFormErrors] = useState<{ email?: string }>({})

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
  })

  const {
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
  })

  const validateForm = () => {
    try {
      formSchema.parse(formValues)
      setFormErrors({})
      return true
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors
        setFormErrors({
          email: errors.email?.[0],
        })
      }
      return false
    }
  }

  const { mutate: forgotPassword, status } = useMutation({
    mutationFn: forgetPasswordDto,
    onSuccess: (response: any) => {
      toast.success(response.data?.message)
      setFormValues({ email: "" })
      setFormErrors({})
      navigate(`/enter-otp?email=${formValues.email}`)
    },
    onError: (error: GenericError) => {
      toast.error(error?.response?.data.message)
    },
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleForgotPassword = async (e: any) => {
    e.preventDefault()
    if (validateForm()) {
      forgotPassword(formValues)
    }
  }

  const isDisabled = () => {
    const hasErrors = Object.keys(errors).length > 0
    const hasEmptyFields = !formValues.email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)

    return hasErrors || hasEmptyFields || !isValidEmail || status === "pending"
  }

  return { formValues, formErrors, handleInputChange, handleForgotPassword, status, isDisabled }
}
