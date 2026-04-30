import apiClient from "../config/axiosinstance"
import qs from "qs"

const fetchAllEventsDto = async (data: {
  page?: number
  per_page?: number
  search?: string
  from?: string
  to?: string
}) => {
  const { page, per_page, search, from, to } = data
  const queryString = qs.stringify(
    {
      page,
      per_page,
      search,
      from,
      to,
    },
    {
      filter: (_, value) => value || undefined,
    },
  )

  const response = await apiClient.get(`/users/events?${queryString}`)
  return response.data
}

const fetchEventByIdDto = async (id: string) => {
  const response = await apiClient.get(`/users/events/${id}`)

  return response.data
}

const fetchEventRegistrationStatusDto = async (id: string) => {
  const response = await apiClient.get(`/users/events/status/${id}`)

  return response?.data
}

const registerEventDto = async (id: string) => {
  const response = await apiClient.post(`/users/events/${id}`)

  return response
}

const eventService = {
  fetchAllEventsDto,
  fetchEventByIdDto,
  fetchEventRegistrationStatusDto,
  registerEventDto
}

export { eventService }
