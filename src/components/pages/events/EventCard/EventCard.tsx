import { Button } from "../../../core/Button/Button"
import { Icon } from "@iconify/react"

interface EventCardInterface {
  title: string
  eventImg?: string
  organizer: string
  venue: string
  from: string
  to: string
  date: string
  addBorder?: boolean
  onClick?: () => void
}

const EventCard = ({
  title,
  eventImg,
  organizer,
  venue,
  to,
  from,
  date,
  addBorder = false,
  onClick,
}: EventCardInterface) => {
  return (
    <div className={` ${addBorder ? "border-1 border-[#C7C7C7] rounded-xl p-4" : ""} flex flex-col gap-6 md:flex-row`}>
      <div className="">
        {" "}
        <img
          src={eventImg ? eventImg : "/assets/featured-events.png"}
          className="rounded-lg w-[300px] "
        />
      </div>
      <div className="">
        <div className="space-y-1">
          <h1 className="text-black work-sans font-semibold text-2xl">{title}</h1>
          <p className="text-sm">
            Organizer: <span className="font-medium">{organizer}</span>
          </p>
          <p className="text-sm">
            Venue: <span className="font-medium">{venue}</span>
          </p>
          <div className="text-sm flex items-center flex-wrap gap-x-1">
            <p>
              Date: <span className="font-medium">{date}</span>
            </p>
            <p>
              From: <span className="font-medium">{from}</span> Till <span className="font-medium">{to}</span>
            </p>
            <Icon icon="ph:clock-countdown" />
          </div>
        </div>
        <div className="flex items-center justify-center md:items-start md:justify-start w-full pt-4">
          <Button theme="transparent" size="40" onClick={onClick}>
            Click to view details
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventCard
