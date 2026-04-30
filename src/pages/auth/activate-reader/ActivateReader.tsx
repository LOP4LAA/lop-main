import { Button } from "@/components/core/Button/Button"
import { InputComponent } from "@/components/core/Input/Input"
import AuthForm from "@/components/pages/Auth/AuthForm/AuthForm"
import useActivateReader from "./useActivateReader"

const ActivateReader = () => {
  const { formValues, formErrors, handleInputChange, handleChangePassword, activateReaderStatus, isDisabled } =
    useActivateReader()
  return (
    <main>
      <AuthForm title="Create Password" caption="Enter your new password" onSubmit={handleChangePassword}>
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
            id="confirm_new_password"
            name="confirm_new_password"
            value={formValues.confirm_new_password}
            onChange={handleInputChange}
            error={formErrors.confirm_new_password}
          />
        </div>
        <Button
          size="44"
          type="submit"
          className=" my-10 w-full"
          disabled={isDisabled || activateReaderStatus === "pending"}
          theme="secondary"
          loading={activateReaderStatus === "pending"}
        >
          Submit Password
        </Button>
      </AuthForm>
    </main>
  )
}

export default ActivateReader
