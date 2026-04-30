import { ModuleStepper } from "../../components/core/Tabs/Tabs"

import { RenderIf } from "../../components/hoc/RenderIf/RenderIf"
import useActivity from "./useActivity"
import { Avatar } from "../../components/core/Avatar/Avatar"
import { formatDate } from "../../utils/formatDate"
import { LoaderIcon } from "react-hot-toast"

const Activity = () => {
  const { tabs, currentTab, activityData, isLoading } = useActivity()
  return (
    <main className="py-4">
      <h1 className="font-custom text-[32px] text-primary">My Activity</h1>
      <div className="my-10">
        <ModuleStepper tabs={tabs} currentTab={currentTab} />

        <RenderIf condition={isLoading}>
          <div className="flex items-center justify-center">
            <LoaderIcon className="w-4 h-4" />
          </div>
        </RenderIf>

        <RenderIf condition={!isLoading}>
          <RenderIf condition={activityData?.length === 0}>
            <h1 className="text-lg open-sans text-primary">You have no activities at this time</h1>
          </RenderIf>
          <RenderIf condition={activityData?.length > 0}>
            <div className="space-y-8 mt-10">
              {activityData?.map((activity: any, index: number) => (
                <div className="flex gap-x-2 items-center" key={index}>
                  <Avatar image={activity?.avatar ? activity?.avatar : activity.user} size="32" />
                  <div className="text-primary">
                    <p>{activity?.activity}</p>
                    <p className="text-xs">{activity?.time ? formatDate(activity.time) : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </RenderIf>
        </RenderIf>
      </div>
    </main>
  )
}

export default Activity
