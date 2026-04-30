import { useQuery } from "@tanstack/react-query"
import { eventService } from "../../../../services/eventServices"

export default function useEvents() {
  const { fetchAllEventsDto } = eventService

  const { data: allEvents, status } = useQuery({
    queryKey: ["enrolled-books"],
    queryFn: () =>
      fetchAllEventsDto({
        page: 1,
        per_page: 6,
      }),
  })

  // const eventsData = [
  //   {
  //     title: "Seminar: Women's rights",
  //     organizer: "Omolara Oniye",
  //     venue: "Meadow hall, VI",
  //     date: "8, Nov. 2024",
  //     from: "9:00pm",
  //     to: "10:00pm",
  //   },
  // ]

  const isLoading = status === "pending"
  return { eventsData: allEvents?.data?.events, isLoading }
}
