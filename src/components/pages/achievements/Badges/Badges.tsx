import { RenderIf } from "../../../hoc/RenderIf/RenderIf"
import BadgeSvg from "../../../../assets/svg/Badges"

const AchievementsBadges = ({ data }: any) => {
  return (
    <div>
      <h1 className="text-lg text-primary_100/80 font-medium work-sans">Badges</h1>
      <RenderIf condition={data?.length === 0}>
        <h1 className="mt-6 text-primary_100 work-sans font-medium">You have no badges at this time.</h1>
      </RenderIf>

      <RenderIf condition={data?.length > 0}>
        <div className="bg-primary/5 max-h-[280px] lg:max-h-[550px] overflow-y-auto rounded-[10px] grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {data?.map((badge: string, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <BadgeSvg />
              <p>{badge}</p>
            </div>
          ))}
        </div>
      </RenderIf>
    </div>
  )
}

export default AchievementsBadges
