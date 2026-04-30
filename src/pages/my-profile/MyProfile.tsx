import { Avatar } from "../../components/core/Avatar/Avatar"
import BadgeSvg from "../../assets/svg/Badges"
import { RenderIf } from "../../components/hoc/RenderIf/RenderIf"
import { Button } from "../../components/core/Button/Button"
import useMyProfile from "./useMyProfile"
import EnrolledBooks from "./enrolled-books"
import { useNavigate } from "react-router-dom"
import { LoaderIcon } from "react-hot-toast"
import { getMonthYear } from "../../utils/formatDate"

const MyProfile = () => {
  const { badgeData, enrolledBooksData, profileInfo, isLoadingProfile, isLoadingBooks } = useMyProfile()
  const navigate = useNavigate()
  return (
    <main className="py-2">
      <h1 className="font-custom text-[32px] text-primary_100">My Profile</h1>

      <div className="my-8 w-full rounded-lg h-full lg:w-11/12 border-1 border-grey_2 px-4 py-8 space-y-12">
        <RenderIf condition={!isLoadingProfile && profileInfo}>
          <div className="flex  flex-col gap-6 justify-center items-center ">
            <div className="w-full md:w-10/12 flex items-center bg-secondary_2/15 rounded-[16px] p-4">
              <div className="flex w-full flex-col md:items-center md:flex-row gap-4 md:justify-between">
                <div className="flex items-center gap-x-3">
                  <Avatar
                    image={
                      profileInfo?.avatar ? profileInfo?.avatar : `${profileInfo?.first_name} ${profileInfo?.last_name}`
                    }
                    size="97"
                  />
                  <div className="text-primary space-y-2 capitalize">
                    <p className="font-medium">{`${profileInfo?.first_name} ${profileInfo?.last_name}`}</p>
                    <p className="text-sm lowercase">{profileInfo?.email ?? ""}</p>
                    <p className="text-sm">
                      Position: <span>{profileInfo?.user_type}</span>
                    </p>
                    <p className="text-sm">
                      Leaderboard Position: <span>{profileInfo?.position ?? " --"}</span>
                    </p>
                    <p className="text-sm">
                      Points: <span>{profileInfo?.points ?? " --"}</span>
                    </p>
                    <p className="text-sm">
                      Cohort: <span>{getMonthYear(profileInfo?.created_at ?? "")}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <Button onClick={() => navigate("/dashboard/profile-settings")} size="44" theme="primary">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-10/12">
              <h1 className="text-start mb-[15px] text-primary/80 text-lg font-medium">Badges</h1>
              <RenderIf condition={badgeData?.length > 0}>
                <div className="bg-primary/5 h-full lg:max-h-[550px] overflow-y-auto rounded-[10px] grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4">
                  {badgeData?.map((badge: string, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-y-3">
                      <BadgeSvg />
                      <p className="text-center text-sm open-sans text-primary_100 font-normal">{badge}</p>
                    </div>
                  ))}
                </div>
              </RenderIf>
              <RenderIf condition={badgeData?.length === 0}>
                <h1 className="open-sans text-primary text-sm mt-6">You have no badges at this time</h1>
              </RenderIf>
            </div>
          </div>
        </RenderIf>

        <RenderIf condition={isLoadingProfile}>
          <div className="flex justify-center items-center h-full w-full">
            <LoaderIcon className="w-4 h-4" />
          </div>
        </RenderIf>

        <EnrolledBooks data={enrolledBooksData} isLoading={isLoadingBooks} />
      </div>
    </main>
  )
}

export default MyProfile
