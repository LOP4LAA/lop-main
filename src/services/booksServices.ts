import qs from "qs"
import apiClient from "../config/axiosinstance"
import { GenericApiResponse } from "../types"
import { BooksResponse, BookResponse, EnrollBookResponse } from "../types/books"

const fetchAllBooks = async (data: { page?: number; per_page?: number; search?: string; status?: string;  }): Promise<BooksResponse> => {
  const { page, per_page, search, status } = data
  const queryString = qs.stringify(
    {
      page,
      per_page,
      search,
      status
    },
    {
      filter: (_, value) => value || undefined,
    },
  )
  const response = await apiClient.get<BooksResponse>(`/admins/books?${queryString}`)
  return response.data
}

const fetchEnrolledBooks = async (data: {
  page?: number
  per_page?: number
  search?: string
  status?: string
}): Promise<BooksResponse> => {
  const { page, per_page, search } = data
  const queryString = qs.stringify(
    {
      page,
      per_page,
      search,
      status,
    },
    {
      filter: (_, value) => value || undefined,
    },
  )
  const response = await apiClient.get<BooksResponse>(`/users/book-enrollment?${queryString}`)
  return response.data
}

const fetchBook = async (id: string): Promise<BookResponse> => {
  const response = await apiClient.get<BookResponse>(`/admins/books/${id}`)
  return response.data
}

const enrollBook = async (bookId: string): Promise<EnrollBookResponse> => {
  const response = await apiClient.post<EnrollBookResponse>("/users/book-enrollment", { book_id: bookId })
  return response.data
}
const sendMessage = async ({
  message,
  type,
  chat_room,
}: {
  message: string
  type: string
  chat_room: string
}): Promise<GenericApiResponse> => {
  const response = await apiClient.post<GenericApiResponse>("/chats", { message, type, chat_room })
  return response.data
}

const markAsCompleted = async (data: { book_id: string; module_id: string }) => {
  const { book_id, module_id } = data

  const response = await apiClient.patch(`/users/enrollments/${book_id}/${module_id}`)

  return response
}

const booksServices = {
  fetchEnrolledBooks,
  fetchAllBooks,
  fetchBook,
  enrollBook,
  sendMessage,
  markAsCompleted,
}

export { booksServices }
