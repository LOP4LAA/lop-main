import { useNavigate } from "react-router-dom"
import { Button } from "../../components/core/Button/Button"
import ComputerReader from "../../assets/svg/ComputerReader"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="page-background">
      <div className="content-container flex flex-col items-center justify-center">
        <ComputerReader />
        <h1 className="font-custom text-[100px]">404</h1>
        <p className="text-primary open-sans capitalize">What you seek cannot be found at this time</p>
        <Button onClick={() => navigate("/dashboard")} theme="secondary" size="44" className="mt-6">
          Return Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
