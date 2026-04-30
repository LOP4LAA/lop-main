import useSingleEvent from "./useSingleEvents"
import { Breadcrumb } from "../../../components/core/BreadCrumb/BreadCrumb"
import { Button } from "../../../components/core/Button/Button"
import { RenderIf } from "../../../components/hoc/RenderIf/RenderIf"
import { LoaderIcon } from "react-hot-toast"

const SingleEvent = () => {
  const { eventsData, breadCrumb, isLoading, registerLoading, handleEventRegistration } = useSingleEvent()
  return (
    <main className="py-4">
      <div>
        <Breadcrumb options={breadCrumb} showBack />
        <RenderIf condition={isLoading}>
          <div className="h-full flex items-center justify-center">
            <LoaderIcon className="w-4 h-4" />
          </div>
        </RenderIf>

        <RenderIf condition={!isLoading}>
        <div className="py-8 space-y-8 lg:px-6">
          <h1 className="text-primary capitalize work-sans font-semibold text-2xl">{eventsData.title}</h1>
          <div className="w-full h-[35vh]">
            <img
              src={eventsData?.eventImg ? eventsData?.eventImg : "/assets/featured-events.png"}
              className="rounded-lg w-full h-full"
            />
          </div>
          <div className="text-primary text-sm">
            <p className=" font-medium">
              Organizer: <span className="font-normal">{eventsData.organizer}</span>
            </p>
            <p className=" font-medium">
              Venue: <span className="font-normal">{eventsData.venue}</span>
            </p>
            <p className="font-medium">
              Date: <span className="font-normal ">{eventsData?.date}</span>
            </p>
          </div>
          <div className="text-primary text-sm space-y-2">
            <p className="font-medium">Description</p>
            <p className="text-sm">{eventsData?.description}</p>
          </div>
          <RenderIf condition={eventsData?.guests && eventsData?.guests?.length > 0} >
            <div className="text-primary space-y-2">
              <p>Guests</p>
              <div className="space-y-1">
                {eventsData?.guests?.map((guest: string, index: number) => (
                  <p className="text-sm" key={index}>
                    {guest}
                  </p>
                ))}
              </div>
            </div>
          </RenderIf>
          <RenderIf condition={eventsData?.registered}>
            <Button onClick={() => handleEventRegistration()} loading={registerLoading === "pending"} className="px-8" theme="secondary" size="44">
              Register to Attend
            </Button>
          </RenderIf>
        </div>
        </RenderIf>
      </div>
    </main>
  )
}

export default SingleEvent
