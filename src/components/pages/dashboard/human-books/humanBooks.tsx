import { RenderIf } from "../../../hoc/RenderIf/RenderIf"
import { useNavigate, Link } from "react-router-dom"
import ProgressBar from "../../../core/ProgressBar/ProgressBar"
import ComputerReader from "../../../../assets/svg/ComputerReader"
import { Button } from "../../../core/Button/Button"
import { LoaderIcon } from "react-hot-toast"

const DashboardBooks = ({ data, isLoading }: any) => {
  const navigate = useNavigate()
  return (
    <div>
      <RenderIf condition={isLoading}>
        <div className="flex items-center justify-center">
          <LoaderIcon className="w-4 h-4" />
        </div>
      </RenderIf>

      <RenderIf condition={!isLoading}>
        <div className="flex justify-between w-full items-center mb-6">
          <h1 className="text-primary/80 work-sans font-medium">
            {data?.length > 0 ? "Enrolled Human Books" : "Human Books"}
          </h1>
          {data?.length > 0 && (
            <button
              onClick={() => navigate("/dashboard/books?tab=current-read")}
              className="text-xs font-bold open-sans tracking-[1px] text-grey_3"
            >
              SEE MORE
            </button>
          )}
        </div>
        <RenderIf condition={data && data?.length > 0}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((book: any) => (
              <Link
                to={`/dashboard/books/${book?.book_id}`}
                className="flex flex-col gap-2 items-start w-full"
                key={book?.book_id}
              >
                <div className="flex-shrink-0">
                  <img
                    src={book.cover_photo ? book.cover_photo : "/public/assets/human-books-placeholder.png"}
                    className="rounded-lg w-auto md:h-[200px] object-cover" // Set a fixed height and use object-cover to maintain aspect ratio
                    alt={`${book?.name} cover`}
                  />
                </div>
                <div className="w-full space-y-4">
                  <p className="text-sm text-ellipsis text-nowrap truncate hover:text-nowrap">{book?.name}</p>
                  <ProgressBar percentage={Number(book?.completion_rate ?? 0)} />
                </div>
              </Link>
            ))}
          </div>
        </RenderIf>
        <RenderIf condition={data?.length === 0}>
          <div className="flex pb-10 flex-col gap-4 w-full items-center justify-center">
            <h1 className="text-primary/80 w-10/12 text-center text-sm font-medium open-sans">
              You have not enrolled in any human book yet. Click the link below to start your learning
            </h1>
            <ComputerReader />
            <Button theme="secondary" size="32" onClick={() => navigate("/dashboard/books?tab=all-books")}>
              Enroll in a Human Book
            </Button>
          </div>
        </RenderIf>
      </RenderIf>
    </div>
  )
}

export default DashboardBooks
