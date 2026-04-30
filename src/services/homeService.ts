import apiClient from "../config/axiosinstance"

const addSubscriber = async (data: { email: string; first_name: string; last_name: string }) => {
  const response = await apiClient.post("/users/addSubscriber", data)

  return response
}

const homeService = { addSubscriber }

export { homeService }
