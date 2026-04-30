import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
// import { useSelector } from "react-redux"

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("lop-token") || null
  let location = useLocation()

  // Redirect user to login page if user is not logged in
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />

  return children
}
