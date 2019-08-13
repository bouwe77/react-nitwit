export default date => {
  // Hackety hack: No date means the date has not yet been determined by the server...
  if (!date) return "Just now";

  if (typeof date !== "object") {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);

  // If date is more than a year ago: return the short date including the year.
  var interval = Math.floor(seconds / 86400);
  if (interval >= 365) {
    return getShortDate(date) + "-" + date.getFullYear();
  }

  // If date is 3 or more days ago in the past year: return the short date without the year.
  if (interval >= 3) {
    return getShortDate(date);
  }

  // In all other cases, just return the amount of days, hours, minutes or seconds.
  if (interval >= 1) {
    return interval + "d";
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + "h";
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + "m";
  }

  return Math.floor(seconds) + "s";
};

const getShortDate = date => `${date.getDate()}-${getMonthName(date.getMonth())}`;

const getMonthName = month => {
  var monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
  ];
  return monthNames[month];
};
