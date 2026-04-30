import apiClient from "../config/axiosinstance"
import qs from "qs"

const fetchLeaderBoardDto = async (data: { page?: number; per_page?: number; search?: string }) => {
  const { page, per_page, search } = data

  const queryString = qs.stringify(
    {
      page,
      per_page,
      search,
    },
    {
      filter: (_, value) => value || undefined,
    },
  )

  const response = await apiClient.get(`/users/leaderboard?${queryString}`)

  return response.data
}

const achievementService = { fetchLeaderBoardDto }

export { achievementService }
