import { RenderIf } from "../../../hoc/RenderIf/RenderIf"
import { LoaderIcon } from "react-hot-toast"

const AchievementsLeaderBoard = ({ data, isLoading }: any) => (
  <div className="">
    <h1 className="text-lg text-primary_100/80 font-medium work-sans">Leaderboard</h1>
    <RenderIf condition={isLoading}>
      <div className="w-full h-full flex items-center justify-center">
        <LoaderIcon className="w-4 h-4" />
      </div>
    </RenderIf>

    <RenderIf condition={!isLoading}>
      <RenderIf condition={data?.length === 0}>
        <div className="mt-6 flex w-full flex-col h-full">
          <h1 className="text-start text-primary_100 work-sans font-medium">No Leaderboard data yet</h1>
        </div>
      </RenderIf>
      <RenderIf condition={data?.length !== 0}>
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 text-left">
          {/* Header (sticky) */}
          <div className="sticky top-0 z-10 font-medium text-center py-2 text-primary_100/80  ">Position</div>
          <div className="sticky top-0 z-10 font-medium text-center py-2 text-primary_100/80  ">Reader</div>
          <div className="sticky top-0 z-10 font-medium text-center py-2 text-primary_100/80  ">Points</div>

          {/* Scrollable body */}
          <div className="col-span-3 max-h-[280px] lg:max-h-[550px] overflow-y-auto">
            {data.map((row: any, index: number) => (
              <div key={index} className="grid grid-cols-[auto_1fr_auto] gap-4 text-center py-2">
                <div>{row.position}</div>
                <div>{row.reader}</div>
                <div>{row.score}</div>
              </div>
            ))}
          </div>
        </div>
      </RenderIf>
    </RenderIf>
  </div>
)

export default AchievementsLeaderBoard
