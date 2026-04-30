import { InputComponent } from "../../../../core/Input/Input"
import { Button } from "../../../../core/Button/Button"
import useChangePassword from "./useChangePassword"

const ChangePasswordSettings = () => {
  const { formValues, formErrors, handleInputChange, handleChangePassword, isLoading, isDisabled } = useChangePassword()
  return (
    <div>
      <h1 className="text-lg font-medium text-primary/80">Change Password</h1>
      <form className="py-8 space-y-4" onSubmit={handleChangePassword}>
        <InputComponent
          label="Current Password"
          id="current password"
          type="password"
          name="current_password"
          value={formValues.current_password}
          error={formErrors.current_password}
          onChange={handleInputChange}
        />
        <InputComponent
          label="New Password"
          id="new password"
          type="password"
          name="new_password"
          value={formValues.new_password}
          onChange={handleInputChange}
          error={formErrors.new_password}
        />
        <InputComponent
          label="Confirm New Password"
          id="confirm password"
          type="password"
          name="confirm_new_password"
          value={formValues.confirm_new_password}
          onChange={handleInputChange}
          error={formErrors?.confirm_new_password}
        />
        <Button disabled={isDisabled || isLoading} loading={isLoading} className="w-full" theme="secondary" size="44">
          Save
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordSettings
