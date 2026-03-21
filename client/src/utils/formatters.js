/**
 * Formats a 24-hour time string (e.g., "14:30" or "14:30:00") into a 12-hour AM/PM format ("02:30 PM").
 */
export const formatTime = (timeString) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const h = parseInt(hours, 10);
  const m = parseInt(minutes, 10);
  if (isNaN(h) || isNaN(m)) return timeString;
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedHours = h % 12 || 12;
  const formattedMinutes = m < 10 && m.toString().length === 1 ? `0${m}` : m.toString().padStart(2, '0');
  return `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes} ${ampm}`;
};

/**
 * Formats a date string or object into "MMM DD, YYYY" format (e.g., "Oct 24, 2024").
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
};
