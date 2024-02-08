exports.isValidDay = (i_Year, i_Month, i_Day) => {
  // Adjust month value since JavaScript months are zero-based (0 for January, 11 for December)
  i_Month--;

  // Create a Date object with the provided year, month, and day
  const date = new Date(i_Year, i_Month, i_Day);

  // Check if the year, month, and day match the provided values
  // (JavaScript will automatically adjust the day if it's out of range for the given month)
  return (
    date.getFullYear() === i_Year &&
    date.getMonth() === i_Month &&
    date.getDate() === i_Day
  );
};

// Define a named function to check if the value contains only letters in English
exports.isValidEnglishName = (value) => {
  return /^[a-zA-Z]+$/.test(value);
};
