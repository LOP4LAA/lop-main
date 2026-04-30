import PersonalInformationSettings from "../../components/pages/MyProfile/ProfileSettings/PersonalInformation/PersonalInformation"
// import NotificationSettings from "../../components/pages/MyProfile/ProfileSettings/NotificationSettings/NotificationSettings"
import ChangePasswordSettings from "../../components/pages/MyProfile/ProfileSettings/ChangePassword/ChangePassword"

const ProfileSettings = () => {
  return (
    <main className="py-2">
      <h1 className="font-custom text-[32px] text-primary_100">Profile Settings</h1>

      <div className="my-8 w-full rounded-lg h-full lg:w-11/12 border-1 border-grey_2 px-4 py-8 space-y-12">
        <div className="w-full lg:w-11/12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-[100px]">
          <PersonalInformationSettings />
          <div className="grid grid-rows-2 gap-6">
            <ChangePasswordSettings />
            {/* <NotificationSettings /> */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfileSettings
