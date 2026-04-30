import { useState } from "react"
import { homeService } from "../../services/homeService"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export default function useHome() {
  const { addSubscriber } = homeService
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
  })

  const { mutate: addSubscriberMutation, status: addSubscriberStatus } = useMutation({
    mutationFn: addSubscriber,
    onSuccess: (response) => {
      toast.success(response?.data?.message)
      setFormData({
        email: "",
        full_name: "",
      })
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred performing this action")
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const { full_name } = formData
    const data = {
      first_name: full_name.split(" ")[0],
      last_name: full_name.split(" ")[1],
      email: formData.email,
    }

    if (formData) {
      addSubscriberMutation(data)
    }
  }

  return { formData, setFormData, isLoading: addSubscriberStatus === "pending", handleSubmit }
}
