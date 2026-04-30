import useDiscussionForums from "./useDiscussionForums"
import { useNavigate } from "react-router-dom"
import { Avatar } from "../../../core/Avatar/Avatar"

const DashboardDiscussion = () => {
  const navigate = useNavigate()
  const { isLoading, discussion } = useDiscussionForums()
  if (discussion?.length === 0 || isLoading) {
    return null
  }

  return (
    <div>
      <div className="flex justify-between w-full items-center mb-6">
        <h1 className="text-primary/80 work-sans text-lg font-medium">Discussion Forums</h1>
        {discussion?.length > 0 && (
          <button
            onClick={() => navigate("/human-books")}
            className="text-xs font-bold open-sans tracking-[1px] text-grey_3"
          >
            SEE MORE
          </button>
        )}
      </div>
      <div className="py-4 space-y-4">
        {discussion?.map((discussion, index) => (
          <div
            key={index}
            className="border-b-grey_2 border-b-[0.5px] items-start py-3 flex justify-between last:border-b-0 last:py-2"
          >
            <div className="flex gap-2">
              <div className="">
                <Avatar image={discussion.room} size="48" />
              </div>
              <div className="">
                <p className="text-sm text-primary/80 font-medium work-sans">
                  <span className="text-grey_5">{`${discussion.user} `}</span>
                  in <span className="text-grey_5">{discussion.room}</span>
                </p>
                <p className="text-sm text-primary/80 w-10/12">{discussion.message}</p>
              </div>
            </div>
            <p className="text-sm text-primary/80">May 7, 2024</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardDiscussion
