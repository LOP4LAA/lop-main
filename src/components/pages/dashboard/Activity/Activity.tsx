import useActivity from "./useActivity"
import { useNavigate } from "react-router-dom"

const DashboardActivity = () => {
  const { activityData } = useActivity()
  const isLoading = false
  const navigate = useNavigate()
  if (activityData?.length === 0 || isLoading) {
    return null
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-primary/80 text-lg work-sans font-medium">Activity</h1>
        {activityData?.length > 0 && (
          <button
            onClick={() => navigate("/human-books")}
            className="text-xs font-bold open-sans tracking-[1px] text-grey_3"
          >
            SEE MORE
          </button>
        )}
      </div>
      <div className="py-4 ">
        {activityData?.map((data, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-sm  text-grey_5 text-wrap font-medium work-sans">
              <span className="text-primary/80">{data?.activity} </span>
              {data?.message}
            </p>
            <p className="text-sm text-primary/80">May 7, 2024</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardActivity
