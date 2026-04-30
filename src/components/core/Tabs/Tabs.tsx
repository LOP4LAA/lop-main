import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface Tab {
  title: string
  path: string
  component?: ReactNode
  active: string
}

interface ModuleStepperProps {
  tabs: Tab[]
  currentTab?: string | null
  callback?: () => void
}

export const ModuleStepper = ({ tabs, currentTab, callback }: ModuleStepperProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between mb-[24px]">
      <div className="w-full flex gap-x-5">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            disabled={currentTab === tab.active}
            className={`
                        text-sm font-normal mr-[24px] pt-[8px]
                        ${currentTab === tab.active ? "selected-tab" : "unselected-tab"}
                        `}
            onClick={() => {
              if (callback) callback()
              navigate(tab.path)
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  )
}
