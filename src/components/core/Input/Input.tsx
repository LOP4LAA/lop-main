import { Icon } from "@iconify/react"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RenderIf } from "../../hoc/RenderIf/RenderIf"
import "./input.css"

interface InputProps {
  className?: string
  label?: string
  optional?: string | ReactNode
  caption?: string | ReactNode
  disabled?: boolean
  readOnly?: boolean
  error?: any
  onChange?: any
  id: string
  placeholder?: string
  type?: string
  name?: string
  allowDecimals?: boolean
  variant?: string
  leftIcon?: string | ReactNode
  rightIcon?: string | ReactNode
  [x: string]: unknown
}

export const InputComponent = ({
  className,
  label,
  optional,
  id,
  onChange,
  disabled,
  readOnly,
  error,
  caption,
  type,
  name,
  variant,
  allowDecimals,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [passwordView, setPasswordView] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const preventDecimal = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allowDecimals && (event.key === "." || event.key === ",")) {
      event.preventDefault()
    }
  }

  const preventDecimalInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (!allowDecimals) {
      const input = event.target as HTMLInputElement
      input.value = input.value.replace(/[^0-9]/g, "")
    }
  }

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (document.activeElement === inputRef.current) {
        event.preventDefault()
      }
    }

    const handleArrowKeys = (event: KeyboardEvent) => {
      if ((event.key === "ArrowUp" || event.key === "ArrowDown") && document.activeElement === inputRef.current) {
        event.preventDefault()
      }
    }

    const inputElement = inputRef.current
    inputElement?.addEventListener("wheel", handleWheel)
    inputElement?.addEventListener("keydown", handleArrowKeys)

    return () => {
      inputElement?.removeEventListener("wheel", handleWheel)
      inputElement?.removeEventListener("keydown", handleArrowKeys)
    }
  }, [])

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <RenderIf condition={!!label}>
        <div className="space-y-1 pb-1 sm:pb-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor={id}
              className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                isFocused ? "text-secondary_1" : "text-primary_100/80"
              }`}
            >
              {label}
            </label>
            <RenderIf condition={!!optional}>{<div className="text-xs sm:text-sm">{optional}</div>}</RenderIf>
          </div>
          <RenderIf condition={!!caption}>
            <div className="text-xs text-grey_1">{caption}</div>
          </RenderIf>
        </div>
      </RenderIf>

      <div className="relative w-full input-container">
        <RenderIf condition={!!leftIcon}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{leftIcon}</div>
        </RenderIf>

        <input
          type={(type === "password" && (passwordView ? "text" : "password")) || type}
          readOnly={readOnly}
          ref={inputRef}
          disabled={disabled}
          id={id}
          onChange={onChange}
          name={name}
          autoComplete="off"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (type === "number") preventDecimal(e)
          }}
          onInput={(e) => {
            if (type === "number") preventDecimalInput(e)
          }}
          className={`
            ${variant}
            p-2.5 sm:p-3 h-[40px] sm:h-[44px] text-sm sm:text-base text-primary_100 w-full outline-0
            border border-grey_1 hide_tap rounded-md
            transition-all duration-200 ease-out
            focus:border-secondary_1 focus:ring-2 focus:ring-secondary_1/20
            hover:border-primary_100/50
            placeholder:text-sm sm:placeholder:text-base placeholder:text-grey_1
            ${error ? "border-error focus:border-error focus:ring-error/20" : ""}
            ${disabled ? "bg-grey-50 cursor-not-allowed opacity-60" : "bg-white"}
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon || type === "password" ? "pr-10" : ""}
          `}
          style={{ fontSize: "16px" }}
          {...props}
        />

        <RenderIf condition={type === "password"}>
          <motion.button
            onClick={() => setPasswordView(!passwordView)}
            type="button"
            data-testid={!passwordView ? "show" : "hide"}
            className="flex items-center absolute top-0 right-3 cursor-pointer hide_tap h-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {!passwordView ? (
              <Icon icon="ph:eye" className="w-4 h-4 sm:w-5 sm:h-5 text-primary_100/60 hover:text-primary_100 transition-colors" />
            ) : (
              <Icon icon="ph:eye-slash" className="w-4 h-4 sm:w-5 sm:h-5 text-primary_100/60 hover:text-primary_100 transition-colors" />
            )}
          </motion.button>
        </RenderIf>

        <RenderIf condition={!!rightIcon}>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">{rightIcon}</div>
        </RenderIf>
      </div>

      <AnimatePresence>
        <RenderIf condition={!!error}>
          <motion.span
            className="block w-full text-right text-xs text-error mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.span>
        </RenderIf>
      </AnimatePresence>
    </motion.div>
  )
}
