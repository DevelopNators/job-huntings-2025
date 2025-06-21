const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const formatDate = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return ""; // Return empty string if the date is not valid
  }
  return dateFormatter.format(new Date(date));
};
export const getEnumName = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value);
};