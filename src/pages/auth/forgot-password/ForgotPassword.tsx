import AuthForm from "../../../components/pages/Auth/AuthForm/AuthForm"
import { InputComponent } from "../../../components/core/Input/Input"
import { Button } from "../../../components/core/Button/Button"
import useForgotPassword from "./useForgotPassword"

const ForgotPasswordPage = () => {
  const { formValues, formErrors, handleForgotPassword, handleInputChange, isDisabled, status } = useForgotPassword()
  return (
    <div className="w-full">
      <AuthForm
        title="Forgot Password"
        caption={"please enter Your Email to receive a link/code to reset your password."}
        onSubmit={handleForgotPassword}
      >
        <div className="my-6">
          <InputComponent
            label="Your email address"
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            error={formErrors.email}
          />
        </div>
        <Button className="w-full" theme="secondary" size="44" disabled={isDisabled()} loading={status === "pending"}>
          submit
        </Button>
      </AuthForm>
    </div>
  )
}

export default ForgotPasswordPage
