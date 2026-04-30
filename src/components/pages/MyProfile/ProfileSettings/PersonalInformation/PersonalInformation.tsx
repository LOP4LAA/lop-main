import { Icon } from "@iconify/react"
import { InputComponent } from "../../../../core/Input/Input"
import { Button } from "../../../../core/Button/Button"
import { Avatar } from "../../../../core/Avatar/Avatar"
import Phone from "../../../../core/PhoneInput/PhoneInput"
import usePersonalInformationSettings from "./usePersonalInformation"

const PersonalInformationSettings = () => {
  const {
    image,
    handleImageChange,
    handleRemoveImage,
    formValues,
    phone,
    setPhone,
    handleProfileUpdate,
    isFormValid,
    isUpdatingProfile,
    handleTextChange,
    isDeletingAvatar,
    profileInfo,
    isUploadingAvatar,
  } = usePersonalInformationSettings()
  return (
    <div>
      <h1 className="text-lg font-medium text-primary/80">Personal Information</h1>
      <div className="py-8 space-y-4">
        <div className="">
          <div className="flex gap-4  items-center">
            <div className="relative">
              <Avatar image={image ? image : `${profileInfo?.first_name} ${profileInfo?.last_name}`} size="97" />
            </div>

            <div className="mt-4 flex flex-col items-start">
              <p className="text-sm text-primary_100 mb-2">Upload a photo under 2 MB</p>
              <label
                htmlFor="image-upload"
                className="bg-primary  flex items-center  text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary_100"
              >
                Upload Image
                {isUploadingAvatar && <Icon icon="svg-spinners:12-dots-scale-rotate" />}
              </label>
              <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

              {image && (
                <button
                  className="flex items-center mt-2 text-yellow-500 hover:text-yellow-700"
                  onClick={handleRemoveImage}
                >
                  Delete profile photo
                  {isDeletingAvatar && <Icon icon="svg-spinners:12-dots-scale-rotate" />}
                </button>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={handleProfileUpdate}>
          <div className="space-y-4">
            <InputComponent
              id="name"
              type="text"
              label="First Name"
              name="first_name"
              value={formValues.first_name}
              onChange={handleTextChange}
            />
            <InputComponent
              id="last_name"
              type="text"
              label="Last Name"
              name="last_name"
              value={formValues.last_name}
              onChange={handleTextChange}
            />
            <InputComponent
              id="email"
              type="email"
              label="Email"
              disabled={true}
              name="email"
              value={formValues.email}
              onChange={handleTextChange}
            />
            <Phone value={phone} onChange={setPhone} label="Phone number" />
            <Button
              loading={isUpdatingProfile}
              disabled={!isFormValid}
              type="submit"
              className="w-full"
              theme="secondary"
              size="44"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalInformationSettings
