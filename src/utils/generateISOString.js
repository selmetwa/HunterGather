export function generateISOString() {
  // Get the current date and time in UTC
  const now = new Date();

  // Set the time zone offset for New York City
  const timeZoneOffset = -4 * 60; // New York City is UTC-4 during Eastern Daylight Time (EDT)

  // Apply the time zone offset to get the New York City time
  const newYorkTime = new Date(now.getTime() + timeZoneOffset * 60 * 1000);

  // Generate the ISO time string
  const isoTimeString = newYorkTime.toISOString();

  return isoTimeString
}