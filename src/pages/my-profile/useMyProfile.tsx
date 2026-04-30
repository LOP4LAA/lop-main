import { useQuery } from "@tanstack/react-query"
import { profileService } from "../../services/profileServices"
import { booksServices } from "../../services/booksServices"

export default function useMyProfile() {
  const { fetchEnrolledBooks } = booksServices
  const { fetchUserProfileDto } = profileService

  const { data: enrolledBooks, status: enrolledBookStatus } = useQuery({
    queryKey: ["enrolled-books-dashboard"],
    queryFn: () =>
      fetchEnrolledBooks({
        page: 1,
        per_page: 6,
      }),
  })

  const { data: userProfile, status: userProfileStatus } = useQuery({
    queryKey: ["user-profile-info"],
    queryFn: () => fetchUserProfileDto(),
  })

  const badgeData = userProfile?.data?.badges?.map((badge: any) => badge?.name) ?? []

  const enrolledBooksData = enrolledBooks?.data?.books?.map((book) => ({
    bookTitle: book.name ?? "",
    bookCover: book.cover_photo ?? "",
    percentageRead: book?.completion_rate ?? 0,
    id: book.book_id,
  }))

  return {
    badgeData,
    enrolledBooksData,
    isLoadingBooks: enrolledBookStatus === "pending",
    isLoadingProfile: userProfileStatus === "pending",
    profileInfo: userProfile?.data,
  }
}
