import { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { LoaderIcon } from "react-hot-toast"
import { useDebouncedValue } from "@wojtekmaj/react-hooks"
import { motion } from "framer-motion"
import useHumanBooks from "./useHumanBooks"
import { ModuleStepper } from "../../components/core/Tabs/Tabs"
import ProgressBar from "../../components/core/ProgressBar/ProgressBar"
import { booksServices } from "../../services/booksServices"
import Pagination from "../../components/core/Pagination/Pagination"
import { RenderIf } from "@/components/hoc/RenderIf/RenderIf"

const limit = 10

const HumanBooks = () => {
  const { tabs, currentTab } = useHumanBooks()
  const [page, setPage] = useState({
    enrolled: 1,
    all: 1,
  })
  const [query, setQuery] = useState({
    enrolled: "",
    all: "",
  })

  const debouncedAllBooksSearch = useDebouncedValue(query.all, 500)
  const debouncedEnrolledBooksSearch = useDebouncedValue(query.enrolled, 500)

  const { data: allBooks, status: allBooksStatus } = useQuery({
    queryKey: ["all-books", page.all, debouncedAllBooksSearch],
    queryFn: () =>
      booksServices.fetchAllBooks({
        page: page.all,
        per_page: limit,
        search: debouncedAllBooksSearch,
        status: "published",
      }),
  })

  const { data: enrolledBooks, status: enrolledBooksStatus } = useQuery({
    queryKey: ["enrolled-books", page.enrolled, debouncedEnrolledBooksSearch],
    queryFn: () =>
      booksServices.fetchEnrolledBooks({
        page: page.enrolled,
        per_page: limit,
        search: debouncedEnrolledBooksSearch,
        status: "published",
      }),
  })

  const isLoading = allBooksStatus === "pending" || enrolledBooksStatus === "pending"

  const data = currentTab === "current-read" ? enrolledBooks : allBooks
  const searchValue = currentTab === "current-read" ? query.enrolled : query.all

  const books = data?.data?.books

  const handlePageChange = (newPage: number) => {
    setPage((prevPage) => ({
      ...prevPage,
      [currentTab === "current-read" ? "enrolled" : "all"]: newPage,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setQuery((prev) => {
      if (currentTab === "current-read") {
        return { ...prev, enrolled: value }
      } else {
        return { ...prev, all: value }
      }
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.main
      className="py-3 sm:py-4 md:py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="font-custom text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-primary"
        variants={itemVariants}
      >
        Welcome Reader
      </motion.h1>

      <motion.div className="mt-4 sm:mt-6" variants={itemVariants}>
        <div>
          <ModuleStepper tabs={tabs} currentTab={currentTab} />

          <div>
            {/* Search Section */}
            <motion.div variants={itemVariants}>
              <search>
                <form className="flex items-center gap-1 search relative w-full sm:w-fit sm:ml-auto mt-4 sm:mt-0">
                  <input
                    type="search"
                    className="h-10 sm:h-11 placeholder:text-primary_100 font-medium placeholder:text-xs sm:placeholder:text-sm placeholder:font-normal text-sm border border-primary_100 outline-none w-full sm:w-[320px] md:w-[400px] lg:w-[429px] rounded-lg pl-4 pr-16 transition-all duration-200 focus:ring-2 focus:ring-secondary/30"
                    placeholder="Search my Human Books"
                    name="search"
                    aria-label="Search my Human Books"
                    autoComplete="off"
                    value={searchValue}
                    onChange={handleChange}
                  />
                  <div className="w-12 sm:w-16 bg-primary_100 h-10 sm:h-11 flex items-center justify-center absolute right-0 rounded-r-lg">
                    <img src="/assets/search.svg" alt="search" width={16} height={16} />
                  </div>
                </form>
              </search>
            </motion.div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16 sm:py-20">
                <LoaderIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            ) : (
              /* Books Grid */
              <motion.div
                className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-x-8 lg:gap-y-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {books && books.length > 0 ? (
                  books.map((book, index) => (
                    <motion.div
                      key={book.book_id ?? book?.id}
                      variants={cardVariants}
                      custom={index}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <Link
                        to={`/dashboard/books/${book.book_id ?? book?.id}`}
                        className="flex flex-col gap-2 sm:gap-3 items-start w-full group"
                      >
                        <div className="flex-shrink-0 w-full overflow-hidden rounded-lg">
                          <img
                            src={book.cover_photo}
                            className="rounded-lg w-full h-[140px] sm:h-[180px] md:h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                            alt={book.name}
                          />
                        </div>
                        <div className="w-full space-y-1 sm:space-y-2">
                          <p className="text-sm sm:text-base font-medium text-primary truncate group-hover:text-secondary_1 transition-colors">
                            {book.name}
                          </p>
                          <RenderIf condition={currentTab === "current-read"}>
                            <ProgressBar percentage={book?.completion_rate ? Number(book?.completion_rate) : 0} />
                          </RenderIf>
                          <RenderIf condition={currentTab !== "current-read"}>
                            <p className="text-xs text-primary_100/70 line-clamp-2">
                              {book.description?.slice(0, 100)}
                            </p>
                          </RenderIf>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="col-span-full text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-base text-primary">No books available.</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Pagination */}
          {books && books.length > 0 && data && (
            <motion.div
              variants={itemVariants}
              className="mt-6 sm:mt-8"
            >
              <Pagination
                currentPage={parseInt(data.data.currentPage)}
                totalPages={data.data.totalPages}
                totalItems={parseInt(data.data.total)}
                itemsPerPage={limit}
                onPageChange={handlePageChange}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.main>
  )
}

export default HumanBooks
