export function formatDate(inputDate: string): string {
    // Split the input date by '-' to extract year, month, and day
    const [year, month, day] = inputDate.split("-")

    // Create a Date object with the extracted year, month, and day
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

    // Define an array of month names
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // Get the month name using the month index from the Date object
    const monthName = monthNames[date.getMonth()]

    // Get the day of the month
    const formattedDay = parseInt(day).toString()

    // Get the year
    const formattedYear = year

    // Construct the formatted date string
    const formattedDate = `${monthName} ${formattedDay}, ${formattedYear}`

    return formattedDate
}
