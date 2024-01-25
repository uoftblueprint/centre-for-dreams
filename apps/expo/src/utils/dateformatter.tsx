export function formatTime(time: Date) {
  const currentTime = new Date();

  const timeDifference = currentTime.getTime() - time.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks >= 52) {
    const years = Math.floor(weeks / 52);
    return years + "y ago";
  } else if (weeks >= 4) {
    const months = Math.floor(weeks / 4);
    return months + "m ago";
  } else if (days >= 7) {
    return weeks + "w ago";
  } else if (hours >= 24) {
    return days + "d ago";
  } else if (minutes >= 60) {
    return hours + "h ago";
  } else if (seconds >= 60) {
    return minutes + "min ago";
  } else {
    return seconds + "s ago";
  }
}
