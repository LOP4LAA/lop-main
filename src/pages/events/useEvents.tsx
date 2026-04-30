import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { eventService } from "../../services/eventServices"

export default function useEvents() {
  const [searchParams] = useSearchParams()
  const { fetchAllEventsDto } = eventService

  const currentTab = searchParams.get("event")

  const currentDate = new Date()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  const formatDate = (date: Date) => date.toISOString().split("T")[0]
  const from: any = formatDate(firstDayOfMonth)
  const to: any = formatDate(lastDayOfMonth)

  const { data: allEvents, status } = useQuery({
    queryKey: ["enrolled-books", { currentTab, from, to }],
    queryFn: () => {
      const queryParams: any = {
        page: 1,
        per_page: 6,
      }

      // Only add date range when currentTab is "this-month"
      if (currentTab === "this-month") {
        queryParams["from"] = from
        queryParams["to"] = to
      }

      return fetchAllEventsDto(queryParams)
    },
  })

  const tabs = [
    { title: "All Events", path: "?event=all", active: "all" },
    { title: "This Month", path: "?event=this-month", active: "this-month" },
  ]

  const isLoading = status === "pending"
  return { eventsData: allEvents?.data?.events, tabs, currentTab, isLoading }
}
