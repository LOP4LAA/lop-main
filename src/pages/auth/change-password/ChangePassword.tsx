import { Button } from "../../../components/core/Button/Button"
import { InputComponent } from "../../../components/core/Input/Input"
import { RenderIf } from "../../../components/hoc/RenderIf/RenderIf"
import AuthForm from "../../../components/pages/Auth/AuthForm/AuthForm"
import SuccessPage from "./SuccessPage"
import useChangePassword from "./useChangePassword"

const ChangePassword = () => {
  const { formValues, formErrors, handleInputChange, handleChangePassword, resetPasswordStatus, isDisabled } =
    useChangePassword()
  return (
    <>
      <AuthForm title="Reset Password" caption="Enter your new password" onSubmit={handleChangePassword}>
        <div className="space-y-6">
          <InputComponent
            label="Password"
            type="password"
            id="password"
            name="new_password"
            onChange={handleInputChange}
            value={formValues.new_password}
            error={formErrors.new_password}
          />
          <InputComponent
            label="Confirm Password"
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formValues.confirm_password}
            onChange={handleInputChange}
            error={formErrors.confirm_password}
          />
        </div>
        <Button
          size="44"
          type="submit"
          className=" my-10 w-full"
          disabled={isDisabled()}
          theme="secondary"
          loading={resetPasswordStatus === "pending"}
        >
          Submit Password
        </Button>
      </AuthForm>
      <RenderIf condition={false}>
        <SuccessPage />
      </RenderIf>
    </>
  )
}

export default ChangePassword
