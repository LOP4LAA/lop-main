import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react"

interface Option {
  title: string
  method?: () => void
}

interface BreadcrumbProps {
  options: Option[]
  showBack?: boolean
  goBackRoute?: string
}

export const Breadcrumb = ({ options, showBack, goBackRoute }: BreadcrumbProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex w-full items-center  mb-[8px]">
      {showBack && (
        <button
          type="button"
          className="
          grid place-items-center w-[30px] h-[30px]
          hover:bg-grey-3 transition-colors duration-300 ease-out mr-[2px]
          "
          onClick={() => (goBackRoute ? navigate(goBackRoute) : navigate(-1))}
        >
          <Icon icon="ph:arrow-left" className="text-grey" />
        </button>
      )}
      {options?.map((option, i) => (
        <Fragment key={option.title}>
          <button
            data-testid="previous"
            onClick={() => (option?.method ? option?.method() : {})}
            className={`
              ${options?.length !== i + 1 ? "text-grey_3  cursor-pointer" : "text-grey_3 cursor-default"}
              text-sm font-thin hide_tap capitalize whitespace-nowrap
            `}
          >
            {option?.title}
          </button>
          {options?.length !== i + 1 ? <Icon icon="ph:caret-right" className="text-grey_3" /> : ""}
        </Fragment>
      ))}
    </div>
  )
}
