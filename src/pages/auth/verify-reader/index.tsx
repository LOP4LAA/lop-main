import AuthForm from "../../../components/pages/Auth/AuthForm/AuthForm"
import { Button } from "@/components/core/Button/Button"
import { RenderIf } from "@/components/hoc/RenderIf/RenderIf"
import { useNavigate } from "react-router-dom"
import useVerifyReader from "./useVerifyReader"

const VerifyReader = () => {
  const { data, isLoading, isError } = useVerifyReader()
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <AuthForm title="Verify Reader">
        <RenderIf condition={isLoading}>
          <p className="text-lg font-medium text-primary_100/80">Please wait while we verify your account...</p>
        </RenderIf>

        <RenderIf condition={isError}>
          <p className="text-lg font-medium text-red-500">Verification failed: An unexpected error occurred.</p>
        </RenderIf>

        <RenderIf condition={!isLoading && !isError && !!data}>
          <div className="space-y-4">
            <p className="text-lg font-medium text-primary_100/80">
              Verification successful! You can proceed to login with your password.
            </p>
            <Button theme="primary" size="40" className="w-[120px]" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </RenderIf>
      </AuthForm>
    </div>
  )
}

export default VerifyReader
