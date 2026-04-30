import { OTPInput } from "../../../components/core/OtpInput/OtpInput"
import { Button } from "../../../components/core/Button/Button"
import AuthForm from "../../../components/pages/Auth/AuthForm/AuthForm"
import useEnterOtp from "./useEnterOtp"
import { Icon } from "@iconify/react"

const EnterOtpPage = () => {
  const {
    handleChange,
    onPaste,
    otp,
    disabledButton,
    resendStatus,
    resendOtpRequest,
    handleVerifyOtp,
    verifyOtpStatus,
  } = useEnterOtp()
  return (
    <AuthForm
      title="Forgot Password"
      caption="Enter the code sent to the provided email address"
      onSubmit={handleVerifyOtp}
    >
      <div className="flex justify-between mb-[24px] w-full">
        <OTPInput
          label="Verification Code"
          value={otp.code}
          onPaste={(e: any) => onPaste(e)}
          onChange={(e: any) => handleChange(e)}
          error=""
        />
      </div>
      <Button
        theme="secondary"
        className="w-full"
        size="44"
        type="submit"
        disabled={!disabledButton()}
        loading={verifyOtpStatus === "pending"}
      >
        Submit
      </Button>
      <div className="w-full pt-8 flex justify-center">
        <button
          type="button"
          onClick={resendOtpRequest}
          className="cursor-pointer flex items-center gap-x-1 text-primary_100"
        >
          Resend otp
          {resendStatus === "pending" && <Icon icon="svg-spinners:12-dots-scale-rotate" />}
        </button>
      </div>
    </AuthForm>
  )
}

export default EnterOtpPage
