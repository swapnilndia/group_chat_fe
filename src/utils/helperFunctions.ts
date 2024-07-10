export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const now = new Date();

  // Helper function to pad single digit numbers with a leading zero
  const pad = (n: number) => (n < 10 ? `0${n}` : n.toString());

  // Format the time as HH:mm
  const formatTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

  // Check if the date is today
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return formatTime(date);
  }

  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return `Yesterday at ${formatTime(date)}`;
  }

  // Format the date as DD-MM-YYYY at HH:mm
  const formatDateAndTime = (d: Date) =>
    `${pad(d.getDate())}-${pad(
      d.getMonth() + 1
    )}-${d.getFullYear()} at ${formatTime(d)}`;

  return formatDateAndTime(date);
}
