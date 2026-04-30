import { useQuery } from "@tanstack/react-query"
import { profileService } from "../../services/profileServices"

export default function useProfileSettings() {
  const { fetchUserProfileDto } = profileService


  const { data: userProfile, status: userProfileStatus } = useQuery({
    queryKey: ["user-profile-info"],
    queryFn: () => fetchUserProfileDto(),
  })

  return { profileInfo: userProfile?.data, isLoadingProfile: userProfileStatus === "pending" }
}
