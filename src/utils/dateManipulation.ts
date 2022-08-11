export default function correctDateForTimezone(date: Date) {
  const correctedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );
  return correctedDate;
}
