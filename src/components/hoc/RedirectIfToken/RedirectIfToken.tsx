import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

export const RedirectIfToken = ({ children }: { children: ReactNode }) => {
  // const token = useSelector((state: any) => state?.auth?.token)
  const token = localStorage.getItem("lop-token") || null
  let location = useLocation()

  // Redirect user to dashboard if user is logged in
  if (token) return <Navigate to="/dashboard" state={{ from: location }} replace />

  return children
}
