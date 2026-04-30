import { authService } from "@/services/authServices"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export default function useVerifyReader() {
  const { verifyUserDto } = authService
  const { token } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["verify-user", token],
    queryFn: () => verifyUserDto({ token }),
    enabled: !!token,
  })

  return {
    data,
    isLoading,
    isError,
    error,
  }
}
