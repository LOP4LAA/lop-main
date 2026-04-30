import { useState, useEffect } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { profileService } from "../../../../../services/profileServices"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  country_code: z.string().min(1, "Country code is required"),
  phone_number: z.string().min(1, "Phone number is required"),
})

export default function usePersonalInformationSettings() {
  const { uploadAvatarDto, updateUserProfileDto, fetchUserProfileDto, deleteAvatarDto } = profileService

  const [image, setImage] = useState(null)

  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country_code: "",
    phone_number: "",
  })

  const [phone, setPhone] = useState<{ phoneNumber: string; countryCode: string }>({
    phoneNumber: "",
    countryCode: "",
  })

  const [isFormValid, setIsFormValid] = useState(false)

  const { mutate: uploadAvatar, status: uploadAvatarStatus } = useMutation({
    mutationFn: uploadAvatarDto,
    onSuccess: (response) => {
      toast.success(response?.data?.message)
      setImage(response?.data?.data?.avatar)
      localStorage.setItem("profile", JSON.stringify(response?.data?.data))
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message)
    },
  })

  const { mutate: deleteAvatar, status: deleteAvatarStatus } = useMutation({
    mutationFn: deleteAvatarDto,
    onSuccess: (response) => {
      toast.success(response?.data?.message)
      localStorage.setItem("profile", JSON.stringify(response?.data?.data))
      setImage(null)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message)
    },
  })

  const { mutate: updateUserProfile, status: updateUserProfileStatus } = useMutation({
    mutationFn: updateUserProfileDto,
    onSuccess: (response) => {
      toast.success(response?.data?.message)
      localStorage.setItem("profile", JSON.stringify(response?.data?.data))
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message)
    },
  })

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0]
    if (file && file.size <= 2 * 1024 * 1024) {
      uploadAvatar(file)
    } else {
      toast.error("Please upload an image under 2 MB.")
    }
  }

  // Handle image removal
  const handleRemoveImage = () => {
    deleteAvatar()
  }

  const { data: userProfile, status: profileStatus } = useQuery({
    queryKey: ["user-profile-info"],
    queryFn: () => fetchUserProfileDto(),
  })

  console.log(userProfile)

  useEffect(() => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      first_name: userProfile?.data?.first_name || "",
      last_name: userProfile?.data?.last_name || "",
      email: userProfile?.data?.email || "",
      // country_code: userProfile?.data?.country_code ?? "",
      // phone_number: userProfile?.data?.phone_number ?? "",
    }))

    setPhone((prevPhone: any) => ({
      ...prevPhone,
      phoneNumber: userProfile?.data?.phone_number || "",
      countryCode: userProfile?.data?.country_code || "+234",
    }))
    if (userProfile?.data?.avatar) {
      setImage(userProfile?.data?.avatar)
    }
  }, [userProfile, profileStatus])

  useEffect(() => {
    if (phone.phoneNumber) {
      setFormValues({
        ...formValues,
        phone_number: phone.phoneNumber,
        country_code: phone.countryCode,
      })
    }
  }, [phone])

  useEffect(() => {
    try {
      // Parse form values with Zod schema
      formSchema.parse({
        ...formValues,
        country_code: phone.countryCode,
      })
      console.log(phone)

      // Check if form values have changed
      const formHasChanged =
        formValues.first_name !== userProfile?.data?.first_name ||
        formValues.last_name !== userProfile?.data?.last_name ||
        formValues.email !== userProfile?.data?.email ||
        formValues.phone_number !== userProfile?.data?.phone_number ||
        phone.countryCode !== userProfile?.data?.country_code

      // Set form validity based on validation and changes
      setIsFormValid(formHasChanged)
    } catch (error) {
      setIsFormValid(false)
    }
  }, [formValues, phone, userProfile])

  const handleProfileUpdate = async (e: any) => {
    e.preventDefault()
    const { email, ...rest } = formValues
    const data = {
      ...rest,
      country_code: phone.countryCode,
    }
    updateUserProfile(data)
  }

  const handleTextChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return {
    image,
    handleImageChange,
    handleRemoveImage,
    isUploadingAvatar: uploadAvatarStatus === "pending",
    formValues,
    phone,
    setPhone,
    handleProfileUpdate,
    isFormValid,
    isUpdatingProfile: updateUserProfileStatus === "pending",
    handleTextChange,
    isDeletingAvatar: deleteAvatarStatus === "pending",
    profileInfo: userProfile?.data,
  }
}
