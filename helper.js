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

// Utility function to check if a value is an integer
const validateInteger = (value, fieldName) => {
  if (!Number.isInteger(value)) {
    return `Invalid ${fieldName}. It must be an integer.`;
  }
  return null; // No error
}

// Utility function to check if a value is a float
const validateFloat = (value, fieldName) => {
  if (isNaN(value)) { // Checking if it's not a number at all
    return `Invalid ${fieldName}. It must be a number.`;
  }
  return null; // No error
}

exports.validateRequest = (req, res, next) => {
  // Fields to validate as integers
  const integerFields = ['user_id', 'year', 'month', 'day'];

  // Validate integer fields
  for (const field of integerFields) {
    const errorMessage = validateInteger(req.body[field], field);
    if (errorMessage) {
      return res.status(400).json({
        message: errorMessage
      });
    }
  }

  // Validate 'sum' as float or integer based on your requirement
  const sumErrorMessage = validateFloat(req.body.sum, 'sum'); // Use validateInteger if 'sum' must be an integer
  if (sumErrorMessage) {
    return res.status(400).json({
      message: sumErrorMessage
    });
  }

  next(); // Proceed if no errors
};