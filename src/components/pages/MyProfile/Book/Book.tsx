import ProgressBar from "../../../core/ProgressBar/ProgressBar"

import { Link } from "react-router-dom"
interface HumanBookInterface {
  bookTitle: string
  bookCover?: string
  percentageRead: string
  id: string
}

const HumanBookComponent = ({ bookTitle, bookCover, percentageRead, id }: HumanBookInterface) => {
  return (
    <Link to={`/dashboard/books/${id}`} className="flex gap-2 items-start w-full">
      <div className="flex-shink-0">
        <img
          src={bookCover ? bookCover : "/assets/human-books-placeholder.png"}
          className="rounded-lg  w-[180px] lg:w-[228px] md:h-[200px] object-cover"
        />
      </div>
      <div className="w-full space-y-4">
        <p>{bookTitle}</p>
        <ProgressBar percentage={Number(percentageRead)} />
      </div>
    </Link>
  )
}

export default HumanBookComponent
