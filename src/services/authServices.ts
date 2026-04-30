import apiClient from "../config/axiosinstance"
import { GenericApiResponse } from "../types"

const loginDto = async (payload: { email: string; password: string }) => {
  const { email, password } = payload

  const response = await apiClient.post<GenericApiResponse>("/auth/login", { email, password })

  return response
}

const registerDto = async (payload: {
  email: string
  first_name: string
  last_name: string
  country_code: string
  phone_number: string
  password: string
  age_range: string
}) => {
  const { first_name, last_name, country_code, phone_number, email, password, age_range } = payload
  const response = await apiClient.post<GenericApiResponse>("/auth/users/requests", {
    first_name,
    last_name,
    country_code,
    phone_number,
    email,
    password,
    age_range,
  })

  return response
}

const forgetPasswordDto = async (payload: { email: string }) => {
  const { email } = payload

  const response = await apiClient.post<GenericApiResponse>("/auth/forgot-password", { email })

  return response
}

const changePasswordDto = async (payload: { new_password: string; confirm_new_password: string }) => {
  const response = await apiClient.patch<GenericApiResponse>("/auth/admins/change-password", payload)

  return response
}

const resetPasswordDto = async (payload: { new_password: string; confirm_password: string; hash: string }) => {
  const { new_password, confirm_password, hash } = payload

  const response = await apiClient({
    url: "/auth/reset-password",
    headers: { " hash-id-key": hash },
    data: { new_password, confirm_password },
    method: "patch",
  })
  return response
}

const verifyForgotPasswordOtpDto = async (payload: { email: string; token: string }) => {
  const response = await apiClient.post<GenericApiResponse>("/auth/verify-otp", payload)

  return response
}

const activateReaderDto = async (payload: { token?: string; new_password: string; confirm_new_password: string }) => {
  const response = await apiClient.patch("/auth/activate", payload)

  return response
}

const verifyUserDto = async (payload: { token?: string }) => {
  const response = await apiClient.get(`/auth/verify-request/${payload.token}`)

  return response
}

const authService = {
  loginDto,
  registerDto,
  forgetPasswordDto,
  resetPasswordDto,
  changePasswordDto,
  verifyForgotPasswordOtpDto,
  activateReaderDto,
  verifyUserDto,
}
export { authService }
