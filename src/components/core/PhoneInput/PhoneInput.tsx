import { ReactNode, useEffect, useState } from "react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import PropTypes from "prop-types"
import "./PhoneInput.css"

interface PhoneInputProps {
  // eslint-disable-next-line
  onChange: (data: { phoneNumber: string; countryCode: string }) => void
  value: any
  variant?: string
  disabled?: boolean
  showError?: boolean
  label: ReactNode
  error?: any
}
const Phone = ({ onChange, value, variant, disabled = false, label, showError, error }: PhoneInputProps) => {
  const [enhancedPhoneNumber, setEnhancedPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+234")

  const formatPhoneNumber = (phoneNumber: string) => {
    let phone
    if (phoneNumber.charAt(0) === "0") phone = phoneNumber.slice(1)
    else phone = phoneNumber
    return phone
  }

  const handleChange = (val: string, country: any) => {
    setEnhancedPhoneNumber(val.slice(country?.dialCode.length))
    setCountryCode(country.dialCode)
  }

  useEffect(() => {
    // Perform side effects after the render phase
    if (onChange) {
      onChange({
        countryCode: countryCode,
        phoneNumber: formatPhoneNumber(enhancedPhoneNumber),
      })
    }
  }, [enhancedPhoneNumber])

  return (
    <div className={`flex flex-col ${variant || "mb-6"}`}>
      <div className="relative">
        <label
          htmlFor="phone_number"
          className={`
            ${disabled ? "bg-none" : "bg-white"} block
            text-sm text-primary_100/80 mb-[4px] cursor-default font-medium ${variant}`}
        >
          {label}
        </label>
        <PhoneInput
          placeholder="Phone number"
          containerStyle={{
            width: "100%",
            borderRadius: "8px",
          }}
          inputProps={{
            disabled: disabled,
            id: "phone_number",
          }}
          buttonStyle={{
            borderBottomLeftRadius: "8px",
            borderTopLeftRadius: "8px",
            borderLeft: "0px",
            borderTop: "0px",
            borderBottom: "0px",
            height: "44px",
            width: "44px",
            left: "2px",
            marginTop: "2px",
            backgroundColor: disabled ? "#F2F3F3" : "#FFFFFF",
          }}
          inputStyle={{
            borderRadius: "4px",
            width: "100%",
            color: "#1F1F39",
            border: "1px solid #949494",
            height: "48px",
            fontFamily: "inter",
            fontSize: "14px",
            boxShadow: "",
            backgroundColor: disabled ? "#F2F3F3" : "#ffffff",
          }}
          onChange={(value, country) => handleChange(value, country)}
          value={`${value?.countryCode}${value?.phoneNumber}`}
          country={countryCode}
          countryCodeEditable={true}
          disableDropdown={false}
          enableSearch
          defaultMask="...-...-...."
          defaultErrorMessage="sfsfsfs"
        />
      </div>
      {showError && <p className={`text-error text-xs mt-1`}>{error}</p>}
    </div>
  )
}

export default Phone
Phone.propTypes = {
  value: PropTypes.object,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  showError: PropTypes.bool,
}
