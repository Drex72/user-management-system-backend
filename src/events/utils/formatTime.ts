export function formatTime(inputTime: string): string {
    // Split the input time by ':' to extract hour, minute, and second
    const [hour, minute] = inputTime.split(':').map(part => parseInt(part));

    // Determine if it's AM or PM
    const period = hour >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    let formattedHour = hour % 12;
    formattedHour = formattedHour === 0 ? 12 : formattedHour; // Convert 0 to 12 for 12-hour format

    // Ensure the minute part is always represented with two digits
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    // Construct the formatted time string
    const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;

    return formattedTime;
}
