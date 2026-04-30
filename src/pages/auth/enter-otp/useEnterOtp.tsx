import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { authService } from "../../../services/authServices"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { GenericError } from "../../../types"

export default function useEnterOtp() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { forgetPasswordDto, verifyForgotPasswordOtpDto } = authService

  const { mutate: resendOtp, status: resendStatus } = useMutation({
    mutationFn: forgetPasswordDto,
    onSuccess: (response: any) => {
      toast.success(response.data?.message)
    },
    onError: (error: GenericError) => {
      toast.error(error?.response?.data.message)
    },
  })

  const { mutate: verifyOtp, status: verifyOtpStatus } = useMutation({
    mutationFn: verifyForgotPasswordOtpDto,
    onSuccess: (response: any) => {
      toast.success(response.data?.message)

      const hash = response?.headers["hash-id-key"]
      localStorage.setItem("hash-id-key", hash)
      navigate(`/reset-password`)
    },
    onError: (error: GenericError) => {
      toast.error(error?.response?.data.message)
    },
  })

  const resendOtpRequest = async (e: any) => {
    e.preventDefault()
    const payload = { email: email ? email : "" }

    resendOtp(payload)
  }

  const email = searchParams.get("email")

  const [otp, setOtp] = useState({
    code: "",
    id: "",
  })

  const handleChange = (value: string) => {
    setOtp(({ id }) => ({ id, code: value }))
  }

  const onPaste = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    const clipboardData = e.clipboardData
    const pastedData = clipboardData?.getData("Text")

    setOtp(({ id }) => ({ id, code: pastedData }))
  }

  const disabledButton = () => {
    return otp.code.length === 4 || email === null || verifyOtpStatus === "pending"
  }

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault()

    if (otp.code.length === 4 && email !== null) {
      verifyOtp({ email: email ? email : "", token: otp.code })
    }
  }

  return {
    handleChange,
    onPaste,
    otp,
    disabledButton,
    resendStatus,
    resendOtpRequest,
    handleVerifyOtp,
    verifyOtpStatus,
  }
}
