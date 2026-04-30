import AuthForm from "../../../components/pages/Auth/AuthForm/AuthForm"
import { Button } from "../../../components/core/Button/Button"

const SuccessPage = () => {
  return (
    <AuthForm title="Your Password has been set" caption="kindly login in with your new password">
      <div>
        <Button className="w-full" theme="secondary" size="44">
          Login
        </Button>
      </div>
    </AuthForm>
  )
}

export default SuccessPage
