import { RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { router } from "./router"
import QueryProvider from "./context/query-provider"

function App() {
  return (
    <>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
      <Toaster />
    </>
  )
}

export default App
