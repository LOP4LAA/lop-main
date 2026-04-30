// import { type ReactNode } from "react"
import Header from "./Header"
import CustomCursor from "../../core/CustomCursor"
import { Outlet } from "react-router-dom"

const LandingPageLayout = () => {
  return (
    <main className="w-full h-full">
      <Header />
      <CustomCursor />
      <Outlet />
    </main>
  )
}

export default LandingPageLayout
