import { useQuery } from "@tanstack/react-query"
import { booksServices } from "../../services/booksServices"

export default function useDashboard() {
  const { fetchEnrolledBooks } = booksServices

  const profile = JSON.parse(localStorage.getItem("profile") ?? "")

  const { data: enrolledBooks, status } = useQuery({
    queryKey: ["enrolled-books-dashboard"],
    queryFn: () =>
      fetchEnrolledBooks({
        page: 1,
        per_page: 6,
        status: "published",
      }),
  })

  const statisticsData = [
    {
      title: "Level points",
      value: profile?.points ?? 0,
      icon: "ph:user-fill",
    },
    {
      title: "Human Books Enrolled",
      value: enrolledBooks?.data?.books?.length ?? 0,
      icon: "ph:graduation-cap-bold",
    },
    {
      title: "Completion Rate",
      value: enrolledBooks?.data?.overall_completion_rate ? `${enrolledBooks?.data?.overall_completion_rate} %` : 0,
      icon: "material-symbols:signal-cellular-alt-rounded",
    },
  ]

  const isEnrolledBooksLoading = status === "pending"
  return { statisticsData, enrolledBooksData: enrolledBooks?.data?.books, isEnrolledBooksLoading }
}
