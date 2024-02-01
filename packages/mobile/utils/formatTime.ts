function formatTime(value: Date) {
  const MINUTE = 60;
  const HOUR = 3600;
  const DAY = 86400;
  const WEEK = 604800;
  const MONTH = 2.628e+6;
  const YEAR = 3.154e+7;

  const currentTime = new Date().getTime();
  const time = value.getTime();
  
  const seconds = Math.floor((currentTime - time) / 1000);

  if (seconds < MINUTE) {
    return `${seconds}s ago`;
  }

  if (seconds < HOUR) {
    const value = Math.floor(seconds / MINUTE);
    return `${value}m ago`;
  }

  if (seconds < DAY) {
    const value = Math.floor(seconds / HOUR);
    return `${value}h ago`;
  }

  if (seconds < WEEK) {
    const value = Math.floor(seconds / DAY);
    return `${value}d ago`;
  }

  if (seconds < MONTH) {
    const value = Math.floor(seconds / WEEK);
    return `${value}w ago`;
  }

  if (seconds < YEAR) {
    const value = Math.floor(seconds / MONTH);
    return `${value}m ago`;
  }

  return `${Math.floor(seconds / YEAR)}y ago`;
}

export default formatTime;