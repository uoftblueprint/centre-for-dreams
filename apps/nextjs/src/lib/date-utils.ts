export const convertToUTC = (date: Date) => {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return utcDate;
};

export const convertFromUTC = (date: Date) => {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000,
  );

  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};

export const formatInTimeZone = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
