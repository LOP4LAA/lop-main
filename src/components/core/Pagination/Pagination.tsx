interface IPagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: IPagination) => {
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="mt-28 flex flex-col items-center gap-3">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full border border-grey_2 text-primary_100 disabled:opacity-50"
        >
          <img src="/assets/chevron-right-blue.svg" alt="" width={12} height={12} />
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`min-w-2 flex items-center justify-center rounded-full text-sm relative after:absolute after:content-[''] after:bg-secondary after:w-full after:h-1 after:-bottom-1 after:rounded-full ${
              currentPage === number ? "text-primary_100" : "text-primary_100 hover:text-primary_100/50"
            }`}
          >
            {number}
          </button>
        ))}

        {totalPages > 7 && <span className="text-gray-700">...</span>}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full border border-grey_2 text-primary_100 disabled:opacity-50"
        >
          <img src="/assets/chevron-right-blue.svg" alt="" width={12} height={12} className="rotate-180" />
        </button>
      </div>

      <div className="text-[0.625rem] text-primary_100">
        {`${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} courses`}
      </div>
    </div>
  )
}

export default Pagination
