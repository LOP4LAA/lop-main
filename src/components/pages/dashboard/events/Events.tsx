import { RenderIf } from "../../../hoc/RenderIf/RenderIf"
import useEvents from "./useEvents"
import { useNavigate, Link } from "react-router-dom"
import { Icon } from "@iconify/react"
// import { Button } from "../../../core/Button/Button"
import { LoaderIcon } from "react-hot-toast"
import { formatTime, formatDay } from "../../../../utils/formatDate"

const DashboardEvents = () => {
  const navigate = useNavigate()
  const { eventsData, isLoading } = useEvents()
  return (
    <div className="bg-[#FFEEDE] rounded-[16px] py-5 px-4">
      <RenderIf condition={isLoading}>
        <div className="flex items-center justify-center">
          <LoaderIcon className="w-4 h-4" />
        </div>
      </RenderIf>
      <RenderIf condition={!isLoading}>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-primary/80 text-lg work-sans font-medium">Events</h1>
            {eventsData?.length > 0 && (
              <button
                onClick={() => navigate("/dashboard/events?event=all")}
                className="text-xs font-bold open-sans tracking-[1px] text-grey_3"
              >
                SEE MORE
              </button>
            )}
          </div>
          <RenderIf condition={eventsData?.length > 0}>
            <div className="space-y-5">
              {eventsData?.map((event: any, index: number) => (
                <Link to={`/dashboard/events/:${event?.id}`} key={index} className="w-full flex">
                  <div className="my-4">
                    <img src={event?.cover_photo ? event?.cover_photo : "/assets/events-placeholder.png" } className="w-full h-2/4" />
                    <div className="pt-4 space-y-1">
                      <h1 className="text-black work-sans font-semibold text-2xl">{event.title}</h1>
                      <p className="text-sm">
                        Organizer: <span className="font-medium">{event?.organizer_name}</span>
                      </p>
                      <p className="text-sm">
                        Venue: <span className="font-medium">{event?.venue}</span>
                      </p>
                      <div className="text-sm flex items-center gap-x-1">
                        <p>
                          Date:{" "}
                          <span className="font-medium">
                            {event?.event_start_date ? formatDay(event?.event_start_date) : ""}
                          </span>
                        </p>
                        <p>
                          From:{" "}
                          <span className="font-medium">
                            {event.event_start_date ? formatTime(event?.event_start_date) : ""}
                          </span>{" "}
                          Till{" "}
                          <span className="font-medium">
                            {event?.event_end_date ? formatTime(event?.event_end_date) : ""}
                          </span>
                        </p>
                        <Icon icon="ph:clock-countdown" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center pt-4">
                      {/* <Button theme="secondary" size="40">
                        Register to Attend
                      </Button> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </RenderIf>
          <RenderIf condition={eventsData?.length === 0}>
            <div className="text-primary">
              <h1>There are no events at this time</h1>
            </div>
          </RenderIf>
        </div>
      </RenderIf>
    </div>
  )
}

export default DashboardEvents
