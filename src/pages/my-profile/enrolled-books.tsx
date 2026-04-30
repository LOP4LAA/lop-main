import { useNavigate } from "react-router-dom"
import HumanBookComponent from "../../components/pages/MyProfile/Book/Book"
import { RenderIf } from "../../components/hoc/RenderIf/RenderIf"
import { LoaderIcon } from "react-hot-toast"

const EnrolledBooks = ({ data, isLoading }: any) => {
  const navigate = useNavigate()
  return (
    <div className="w-full">
      <RenderIf condition={isLoading}>
        <div className="w-full flex items-center justify-center">
          <LoaderIcon className="w-4 h-4" />
        </div>
      </RenderIf>
      <RenderIf condition={!isLoading}>
        <div className="flex justify-between w-full items-center mb-6">
          <h1 className="text-primary/80 work-sans font-medium">Enrollled Human Books</h1>
          {data?.length > 0 && (
            <button
              onClick={() => navigate("/dashboard/books?tab=current-read")}
              className="text-xs font-bold open-sans tracking-[1px] text-grey_3"
            >
              SEE MORE
            </button>
          )}
        </div>
        <RenderIf condition={data?.length > 0}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.map((book: any, index: number) => (
              <HumanBookComponent
                key={index}
                bookTitle={book.bookTitle}
                percentageRead={book.percentageRead}
                bookCover={book.bookCover}
                id={book.id}
              />
            ))}
          </div>
        </RenderIf>
        <RenderIf condition={data?.length === 0}>
          <h1 className="text-primary/80 text-sm font-medium open-sans">
            You have not enrolled to any human books at this time
          </h1>
        </RenderIf>
      </RenderIf>
    </div>
  )
}

export default EnrolledBooks
