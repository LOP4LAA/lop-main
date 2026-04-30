import apiClient from "../config/axiosinstance"

const fetchUserProfileDto = async () => {
  const response = await apiClient.get(`/users/profile`)

  return response.data
}

const uploadAvatarDto = async (file: any) => {
  const formData = new FormData()
  formData.append("file", file)
  const response = await apiClient({
    method: "patch",
    url: `/users/avatar-upload`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  })

  return response
}

const deleteAvatarDto = async () => {
  const response = await apiClient.delete(`/users/avatar-upload`)

  return response
}

const updateUserProfileDto = async (data: {
  first_name: string
  last_name: string
  country_code: string
  phone_number: string
}) => {
  const response = await apiClient.patch("/users/profile", data)

  return response
}

const updateUserPasswordDto = async (data: {
  current_password: string
  new_password: string
  confirm_new_password: string
}) => {
  const response = await apiClient.patch(`/users/profile-password`, data)

  return response
}

const profileService = {
  fetchUserProfileDto,
  uploadAvatarDto,
  updateUserProfileDto,
  updateUserPasswordDto,
  deleteAvatarDto,
}

export { profileService }
