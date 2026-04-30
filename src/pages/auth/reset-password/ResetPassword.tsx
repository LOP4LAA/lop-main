import AuthForm from "../../../components/pages/Auth/AuthForm/AuthForm"
import { Button } from "../../../components/core/Button/Button"
import { InputComponent } from "../../../components/core/Input/Input"
import useResetPassword from "./useResetPassword"

const ResetPassword = () => {
  const { formValues, isDisabled, formErrors, handleInputChange, handleChangePassword, status } = useResetPassword()
  return (
    <div className="w-full">
      <AuthForm title="Change Password" caption="please enter your new password" onSubmit={handleChangePassword}>
        <div className="space-y-6">
          <InputComponent
            label="Password"
            type="password"
            id="new_password"
            name="new_password"
            onChange={handleInputChange}
            value={formValues.new_password}
            error={formErrors?.new_password}
          />
          <InputComponent
            label="Confirm Password"
            type="password"
            id="confirm_new_password"
            name="confirm_new_password"
            value={formValues.confirm_new_password}
            error={formErrors?.confirm_new_password}
            onChange={handleInputChange}
          />
        </div>
        <Button
          size="44"
          type="submit"
          className=" my-10 w-full"
          theme="secondary"
          disabled={isDisabled()}
          loading={status === "pending"}
        >
          Submit Password
        </Button>
      </AuthForm>
    </div>
  )
}

export default ResetPassword
