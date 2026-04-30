import { useQuery, useMutation } from "@tanstack/react-query"
import { eventService } from "../../../services/eventServices"
import { useParams } from "react-router-dom"
import { formatDate, formatTime } from "../../../utils/formatDate"
import toast from "react-hot-toast"

export default function useSingleEvent() {
  const { id } = useParams()

  const { fetchEventByIdDto, fetchEventRegistrationStatusDto, registerEventDto } = eventService

  const { data: singleEvent, status: singleEventStatus } = useQuery({
    queryKey: ["single-event", { id }],
    queryFn: () => fetchEventByIdDto(id ?? ""),
  })

  const { data: registrationStatus, status: registrationStatusStatus } = useQuery({
    queryKey: ["event-registration-status", { id }],
    queryFn: () => fetchEventRegistrationStatusDto(id ?? ""),
  })

  const { mutate: registerForEvent, status: registerLoading } = useMutation({
    mutationFn: registerEventDto,
    onSuccess: () => {
      toast.success("Successfully registered for event!")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to register for event. Please try again later.")
    },
  })

  const handleEventRegistration = async () => {
    registerForEvent(id ?? "")
  }

  const eventsData = {
    title: singleEvent?.data?.title ?? "",
    organizer: singleEvent?.data?.organizer_name ?? "",
    venue: singleEvent?.data?.venue ?? "--",
    date: singleEvent?.data?.event_start_date ? formatDate(singleEvent?.data?.event_start_date) : "--",
    from: singleEvent?.data?.event_start_date ? formatTime(singleEvent?.data?.event_start_time) : "--",
    to: singleEvent?.data?.event_end_date ? formatTime(singleEvent?.data?.event_end_date) : "--",
    id: singleEvent?.data?.id ?? "",
    eventImg: singleEvent?.data?.cover_photo,
    description: singleEvent?.data?.description ?? "",
    guests: singleEvent?.data?.guests ?? [],
    registered: registrationStatus?.event_registration_status,
  }
  const isLoading = singleEventStatus === "pending" || registrationStatusStatus === "pending"

  const breadCrumb = [{ title: "Events" }, { title: isLoading ? "Loading..." : eventsData.title }]

  return { eventsData, isLoading, breadCrumb, registerLoading, handleEventRegistration }
}
