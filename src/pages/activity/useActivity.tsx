import { useSearchParams } from "react-router-dom"
import { activitiesService } from "../../services/activityServices"
import { useQuery } from "@tanstack/react-query"

export default function useActivity() {
  const [searchParams] = useSearchParams()
  const { fetchActivitiesDto } = activitiesService
  const profile = JSON.parse(localStorage.getItem("profile") ?? "")

  const currentTab = searchParams.get("activity")

  const tabs = [
    { title: "All Activity", path: "?activity=all", active: "all" },
    { title: "Enrollments", path: "?activity=enrollment", active: "enrollment" },
  ]

  const { data: activitiesData, status } = useQuery({
    queryKey: ["activities", { currentTab }],
    queryFn: () =>
      fetchActivitiesDto({
        page: 1,
        per_page: 10000,
        operation_type: currentTab === "all" ? null : "ENR",
        performed_by: profile?.id ?? "",
      }),
  })

  const activityData = activitiesData?.data?.activity_log?.map((log: any) => ({
    user: `${log.first_name} ${log.last_name}`,
    avatar: log?.avatar ?? "",
    activity: log?.activity ?? "",
    time: log?.created_at,
  }))

  const isLoading = status === "pending"
  return { currentTab, tabs, activityData, isLoading }
}
