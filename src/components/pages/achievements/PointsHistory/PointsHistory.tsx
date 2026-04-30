import { RenderIf } from "../../../hoc/RenderIf/RenderIf"
import { formatDate } from "../../../../utils/formatDate"

const AchievementsPointHistory = ({ data }: any) => {
  return (
    <div className="space-y-6 w-full">
      <h1 className="text-lg text-primary_100/80 font-medium work-sans">Points History</h1>
      <RenderIf condition={data?.length === 0}>
        <h1 className="mt-6 text-start text-primary_100 work-sans font-medium">You have no Points at this time.</h1>
      </RenderIf>
      <RenderIf condition={data?.length > 0}>
        <div className=" max-h-[280px] lg:max-h-[550px] overflow-y-auto flex gap-4 flex-col">
          {data?.map((point: any, index: number) => (
            <div key={index} className="flex justify-between">
              <div className="flex gap-x-4">
                <img src="/assets/book-placeholder.png" />
                <div>
                  <p className="text-sm text-primary">{point.title}</p>
                  <p className="text-[10px] text-primary">{point?.time ? formatDate(point?.time) : ""}</p>
                </div>
              </div>
              <p className="text-secondary_1 font-medium text-sm">+{point.points}</p>
            </div>
          ))}
        </div>
      </RenderIf>
    </div>
  )
}

export default AchievementsPointHistory
