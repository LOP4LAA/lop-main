import { achievementService } from "../../services/achievementService"
import { booksServices } from "../../services/booksServices"
import { useQuery } from "@tanstack/react-query"

export function useAchievements() {
  const breadCrumbOptions = [{ title: "Dashboard" }, { title: "Achievements" }]
  const { fetchLeaderBoardDto } = achievementService
  const { fetchEnrolledBooks } = booksServices

  const { data: enrolledBooks } = useQuery({
    queryKey: ["enrolled-books-dashboard"],
    queryFn: () =>
      fetchEnrolledBooks({
        page: 1,
        per_page: 6,
      }),
  })

  const profile = JSON.parse(localStorage.getItem("profile") ?? "")

  const { data: leaderboardData, status: leaderboardStatus } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () =>
      fetchLeaderBoardDto({
        page: 1,
        per_page: 10000,
      }),
  })

  const position = leaderboardData?.data?.leaderboard?.filter((row: any) => row?.email === profile?.email)

  const mappedLeaderBoard = leaderboardData?.data?.leaderboard?.map((row: any) => ({
    position: row?.position ?? "",
    reader: `${row?.first_name} ${row?.last_name ?? ""}`,
    score: row?.points ?? "",
  }))

  const statisticsData = [
    {
      title: "Your Position",
      value: leaderboardData ? `${position[0]?.position} / ${leaderboardData?.data?.leaderboard?.length}` : 0,
      icon: "ph:user-fill",
    },
    {
      title: "Human Books Enrolled",
      value: enrolledBooks?.data?.books?.length ?? 0,
      icon: "ph:graduation-cap-bold",
    },
    // {
    //   title: "Completion Rate",
    //   value: "40.6%",
    //   icon: "material-symbols:signal-cellular-alt-rounded",
    // },
  ]

  const pointsHistoryData = [
    {
      title: "Completed Human Book Funmilayo Ransom-Kuti",
      time: "2024-07-17T11:20:40.922Z",
      points: "35 Points",
    },
  ]

  const badgeData = [profile?.badge?.name]

  return {
    breadCrumbOptions,
    statisticsData,
    leaderBoardData: mappedLeaderBoard ?? [],
    pointsHistoryData,
    badgeData,
    isLoadingAchievements: leaderboardStatus === "pending",
  }
}
