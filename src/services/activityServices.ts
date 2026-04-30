import apiClient from "../config/axiosinstance"
import qs from "qs"

const fetchActivitiesDto = async (data: {
  page?: number
  per_page?: number
  search?: string
  from?: string
  to?: string
  operation_type?: string | null
  performed_by: string
}) => {
  const { page, per_page, search, from, to, operation_type, performed_by } = data

  const queryString = qs.stringify(
    {
      page,
      per_page,
      search,
      from,
      to,
      operation_type,
      performed_by,
    },
    {
      filter: (_, value) => value || undefined,
    },
  )

  const response = await apiClient.get(`/users/activites?${queryString}`)

  return response.data
}

const activitiesService = { fetchActivitiesDto }

export { activitiesService }
