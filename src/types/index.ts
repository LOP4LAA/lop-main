export interface GenericApiResponse {
  status: string
  message: string
  code: number
}

export interface GenericError {
  response: {
    data: {
      message: string
    }
  }
}
