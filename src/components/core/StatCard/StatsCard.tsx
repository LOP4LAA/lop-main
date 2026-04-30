import { ReactNode } from "react"
import { Icon } from "@iconify/react"
import { RenderIf } from "../../hoc/RenderIf/RenderIf"

interface StatsCardInterface {
  title: string
  value: string | number
  icon: string | ReactNode
}

const StatisticsCard = ({ title, value, icon }: StatsCardInterface) => {
  return (
    <div className="stats-card rounded-lg sm:rounded-xl bg-teal_1 py-3 sm:py-4 px-3 sm:px-4 md:px-5 flex items-center gap-2 sm:gap-3 md:gap-4 min-h-[70px] sm:min-h-[80px] md:min-h-[90px] transition-all duration-300 hover:shadow-lg cursor-default">
      <div className="bg-primary rounded-full w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <RenderIf condition={typeof icon !== "string"}>{icon}</RenderIf>
        <RenderIf condition={typeof icon === "string"}>
          <Icon
            icon={typeof icon === "string" ? icon : ""}
            className="text-white w-4 h-4 sm:w-5 sm:h-5"
          />
        </RenderIf>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs text-primary_100/70 work-sans truncate">{title}</p>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-primary_100 work-sans">{value}</p>
      </div>
    </div>
  )
}

export default StatisticsCard
