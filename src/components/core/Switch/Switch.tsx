import React from "react"
import { Switch } from "@headlessui/react"
import "./switch.css"

interface ToggleProps {
  /**
   * Renders the size of the Toggle component
   */
  size: "20" | "24"
  /**
   * Shows the checked state of the Toggle component
   */
  checked?: boolean
  /**
   * OnChange callback for Toggle component
   */
  // eslint-disable-next-line no-unused-vars
  onChange?: (checked: boolean) => void
}

/**
 * Toggle component for user interaction
 */
export const Toggle: React.FC<ToggleProps> = (props) => {
  return (
    <Switch
      data-testid="toggle"
      checked={props?.checked}
      onChange={props?.onChange}
      className={`
       bg-white cc-toggle--${props.size}
          relative flex items-center shrink-0  cursor-pointer
          rounded-full border-2 ${props.checked ? "border-secondary" : "border-grey_3"} transition-all duration-200 ease-in-out
      `}
    >
      <span
        aria-hidden="true"
        className={`${props.checked ? `cc-toggle--move-${props.size}` : "translate-x-0"} cc-toggle--inner-${props.size}
            pointer-events-none inline-block transform rounded-full ${props.checked ? "bg-secondary" : "bg-grey_3"} shadow-lg ring-0 transition-all duration-200 ease-in-out`}
      />
    </Switch>
  )
}
