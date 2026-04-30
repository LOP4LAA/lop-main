import React, { ReactNode } from "react"
import "./button.css"
import { Icon } from "@iconify/react"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  size?: "32" | "40" | "44" | "48" | "56" | "custom"
  theme?: "primary" | "secondary" | "transparent"
  children?: string | ReactNode
  [x: string]: any
  disabled?: boolean
}

export const Button = ({
  className,
  children,
  onClick,
  theme = "transparent",
  disabled = false,
  type,
  loading,
  customClass,
  size,
  ...props
}: ButtonProps) => {
  const btn = {
    sizes: {
      custom: customClass,
      "32": "cc-button--32",
      "40": "cc-button--40",
      "44": "cc-button--44",
      "48": "cc-button--48",
      "56": "cc-button--56",
    },
    themes: {
      primary: `text-white ${disabled ? "bg-primary opacity-65" : "cc-button--primary"}`,
      secondary: `text-white ${disabled ? "bg-secondary opacity-65" : "bg-secondary"} border-secondary`,
      transparent: "cc-button--transparent",
    },
  }

  return (
    <button
      className={`
        cc-button capitalize
        ${size ? btn.sizes[size] : ""}
        ${theme ? btn.themes[theme] : ""}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        transition-all duration-200 ease-out
        hover:shadow-md active:scale-[0.98]
        disabled:hover:shadow-none disabled:active:scale-100
        focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:ring-offset-1
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Icon icon="svg-spinners:ring-resize" className="w-5 h-5" />
          <span className="sr-only">Loading...</span>
        </span>
      ) : (
        <>{children}</>
      )}
    </button>
  )
}
