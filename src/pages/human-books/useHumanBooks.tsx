import { useSearchParams } from "react-router-dom"

export default function useHumanBooks() {
  const [searchParams] = useSearchParams()
  const currentTab = searchParams.get("tab")

  const tabs = [
    { title: "My Current Read", path: "?tab=current-read", active: "current-read" },
    { title: "All Human Books", path: "?tab=all-books", active: "all-books" },
  ]
  return { tabs, currentTab }
}
