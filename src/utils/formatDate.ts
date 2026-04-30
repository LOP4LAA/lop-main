function formatDate(isoDate: any) {
  const date = new Date(isoDate) // Parse the ISO string to Date object

  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const ampm = hours >= 12 ? "pm" : "am"
  const hourFormatted = (hours % 12 || 12).toString().padStart(2, "0")

  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "long" })
  const year = date.getFullYear()

  const daySuffix = getDaySuffix(day)

  return `${hourFormatted}:${minutes}${ampm} ${day}${daySuffix} ${month} ${year}`
}

function getDaySuffix(day: any) {
  if (day > 3 && day < 21) return "th" // covers 11th-19th
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

function formatDay(dateString: any) {
  const date = new Date(dateString)

  const day = date.getUTCDate() // Get the day of the month
  const month = date.toLocaleString("en-US", { month: "short" }) // Get the short month name (e.g., "Nov.")
  const year = date.getUTCFullYear() // Get the year

  return `${day}, ${month}. ${year}`
}

function formatTime(dateString: string) {
  const date = new Date(dateString)

  let hours = date.getUTCHours() // Get hours in 24-hour format
  const minutes = date.getUTCMinutes().toString().padStart(2, "0") // Get minutes
  const ampm = hours >= 12 ? "PM" : "AM" // Determine AM or PM

  hours = hours % 12 || 12 // Convert 24-hour format to 12-hour format

  return `${hours}:${minutes} ${ampm}`
}

function getMonthYear(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.toLocaleString("en-US", { month: "long" })

  return `${month}, ${year}`
}

export { formatDate, formatDay, formatTime, getMonthYear }
