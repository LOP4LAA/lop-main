import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { authService } from "../../../services/authServices"
import { GenericError } from "../../../types"

export default function useRegister() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: "",
    first_name: "",
    last_name: "",
    country_code: "",
    phone_number: "",
    email: "",
    password: "",
    age_range: "",
  })

  const [formErrors, setFormErrors] = useState<{
    full_name?: string
    phone_number?: string
    email?: string
    password?: string
    age_range?: string
  }>({})
  const [phone, setPhone] = useState<{ phoneNumber: string; countryCode: string }>({
    phoneNumber: "",
    countryCode: "+234",
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const registerSchema = z.object({
    full_name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    phone_number: z.string().min(1, { message: "Phone number is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    age_range: z.string().min(1, { message: "Age range is required" }),
  })

  const {
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: formData,
  })

  useEffect(() => {
    if (phone.phoneNumber) {
      setFormData({
        ...formData,
        phone_number: phone.phoneNumber,
      })
    }
  }, [phone])

  const validateForm = () => {
    try {
      registerSchema.parse(formData)
      setFormErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors
        setFormErrors({
          full_name: errors.full_name?.[0],
          email: errors.email?.[0],
          phone_number: errors.phone_number?.[0],
          password: errors.password?.[0],
          age_range: errors.age_range?.[0],
        })
      }
      return false
    }
  }

  const { registerDto } = authService

  const { mutate: registerUser, status } = useMutation({
    mutationFn: registerDto,
    onSuccess: (res: any) => {
      setFormData({
        full_name: "",
        first_name: "",
        last_name: "",
        country_code: "",
        phone_number: "",
        email: "",
        password: "",
        age_range: "",
      })
      toast.success(res?.data?.message)
      navigate("/login", { replace: true })
    },
    onError: (error: GenericError) => {
      toast.error(error?.response?.data.message)
    },
  })

  const handleRegister = async (e: any) => {
    e.preventDefault()
    const { full_name, phone_number, password, age_range } = formData
    const data = {
      first_name: full_name.split(" ")[0],
      last_name: full_name.split(" ")[1],
      email: formData.email,
      country_code: `+${phone.countryCode}`,
      phone_number,
      password,
      age_range,
    }

    if (validateForm()) {
      registerUser(data)
    }
  }

  const isDisabled = () => {
    const hasErrors = Object.keys(errors).length > 0
    const hasEmptyFields = !formData.email || !formData.phone_number || !formData?.full_name
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)

    return hasErrors || hasEmptyFields || !isValidEmail || status === "pending"
  }

  return { handleRegister, phone, setPhone, handleChange, formErrors, status, isDisabled, formData }
}
