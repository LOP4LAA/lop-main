export interface Book {
  id: string
  book_id: string
  name: string
  topics: string[]
  cover_photo: string
  description: string
  language: string
  country: string
  modules_count: number
  readers_count: number
  status: string
  created_at: string
  percentage_read?: string
  overall_completion_rate?: string
  completion_rate?: string
  is_enrolled: boolean
}

export interface BooksResponse {
  data: {
    currentPage: string
    totalPages: number
    total: string
    books: Book[]
    overall_completion_rate?: string
  }
}

export interface IndividualBook {
  name: string
  book_id: string
  topics: string[]
  cover_photo: string
  description: string
  status: string
  is_deleted: boolean
  created_at: string
  total: string
  currentPage: string
  totalPages: number
  is_enrolled: boolean
  modules: {
    id: string
    name: string
    uid: string
    is_enrolled: boolean
    thumbnail: string
    preview: string
    uploaded: string
    size: string
    meta: {
      name: string
    }
    video_chapters: string
    duration: string
    video_transcription: string
    is_deleted: boolean
    created_at: string
    percentage_read?: string
    overall_completion_rate?: string
    completion_rate?: string
  }[]
}

export interface BookResponse {
  data: IndividualBook
}

export interface EnrollBookResponse {
  status: string
  message: string
  code: number
  data: {
    id: string
    name: string
    description: string
    created_at: string
  }
}
