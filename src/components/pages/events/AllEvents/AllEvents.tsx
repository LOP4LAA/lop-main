import EventCard from "../EventCard/EventCard"
import { useNavigate } from "react-router-dom"
import { RenderIf } from "../../../hoc/RenderIf/RenderIf"

const AllEvents = ({ events }: any) => {
  const navigate = useNavigate()
  return (
    <div>
      <RenderIf condition={events?.length === 0}>
        <h1 className="open-sans text-primary_100 text-lg">There are no events at this time</h1>
      </RenderIf>
      <RenderIf condition={events?.length > 0}>
        <div>
          {events.map((event: any, index: number) => (
            <EventCard
              key={index}
              eventImg=""
              title={event.title}
              organizer={event.organizer}
              venue={event.venue}
              from={event.from}
              to={event.to}
              addBorder
              date={event.date}
              onClick={() => navigate(`${event.id}`)}
            />
          ))}
        </div>
      </RenderIf>
    </div>
  )
}

export default AllEvents
