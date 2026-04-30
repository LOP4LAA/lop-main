import React from "react"
import { Icon } from "@iconify/react"

interface SearchInputProps {
  id: string
  name: string
  placeholder?: string
  value?: string
  // eslint-disable-next-line no-unused-vars
  onChange: any
  readOnly?: boolean
  defaultValue?: string
  pattern?: string
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"
  className?: string
}

export const Search = React.memo(function Search({
  id,
  name,
  placeholder = "Search",
  value,
  onChange,
  readOnly,
  defaultValue,
  pattern,
  inputMode,
  className,
}: SearchInputProps) {
  return (
    <div className={`relative mb-[3.5px] ${className}`}>
      <input
        id={id}
        name={name}
        type="search"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        inputMode={inputMode}
        pattern={pattern}
        data-testid="search"
        aria-labelledby={id}
        onChange={onChange}
        readOnly={readOnly}
        className={`
                h-[30px] pl-[40px] pr-[8px] text-primary_100 bg-[#FFF]
                text-sm md:min-w-[288px] w-full outline-0 border-1 border-primary font-normal hide_tap
                rounded-[8px] focus:border-primary-200 placeholder:text-primary
                `}
      />
      <div className="flex items-center absolute top-0 left-0 cursor-pointer hide_tap h-full">
        <Icon icon="ph:magnifying-glass" className="h-3 w-3 left-3  text-primary inset-x-0 absolute z-10" />
      </div>
    </div>
  )
})
