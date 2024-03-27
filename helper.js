// Developers:
// First name: Nir, Dor, Yamit
// Last name: Katz, Mizrahi, Segev
// ID:   206361883 , 315429175 , 206776486

exports.isValidDay = (inputYear, inputMonth, inputDay) => {
  // Adjust month value since JavaScript months are zero-based (0 for January, 11 for December)
  inputMonth--;

  const date = new Date(inputYear, inputMonth, inputDay);

  // Check if the year, month, and day match the provided values
  return (
    date.getFullYear() === inputYear &&
    date.getMonth() === inputMonth &&
    date.getDate() === inputDay
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
};

// Utility function to check if a value is a float
const validateFloat = (value, fieldName) => {
  if (isNaN(value)) {
    // Checking if it's not a number at all
    return `Invalid ${fieldName}. It must be a number.`;
  }
  return null; // No error
};

exports.validateRequest = (req, res, next) => {
  // Fields to validate as integers
  const integerFields = ["user_id", "year", "month", "day"];

  // Check if year, month, and day fields are all missing
  if (!req.body.year && !req.body.month && !req.body.day) {
    const now = new Date();
    req.body.year = now.getFullYear();
    // getMonth() is 0-indexed, add 1 to make it 1-indexed
    req.body.month = now.getMonth() + 1;
    req.body.day = now.getDate();
  }

  for (const field of integerFields) {
    const errorMessage = validateInteger(req.body[field], field);
    if (errorMessage) {
      return res.status(400).json({
        message: errorMessage,
      });
    }
  }

  const sumErrorMessage = validateFloat(req.body.sum, "sum");
  if (sumErrorMessage) {
    return res.status(400).json({
      message: sumErrorMessage,
    });
  }

  next(); // Proceed if no errors
};

exports.validateRequestParams = (req, res, next) => {
  const { user_id, year, month } = req.query;

  // Missing required parameters
  if (!user_id || !year || !month) {
    return res.status(400).json({
      message:
        "Missing required parameters. Please provide user_id, year, and month.",
    });
  }

  // Invalid year format
  if (!/^\d{4}$/.test(year)) {
    return res.status(400).json({
      message: "Invalid year format. Please provide a valid year (YYYY).",
    });
  }

  // Invalid month value
  const monthNum = parseInt(month, 10);
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return res.status(400).json({
      message: "Invalid month. Please provide a valid month.",
    });
  }

  // user_id should be a numeric ID
  if (!/^\d+$/.test(user_id)) {
    return res.status(400).json({
      message: "Invalid user_id format. Please provide a numeric user_id.",
    });
  }

  next(); // Proceed if no errors
};

exports.getIntegerValidator = (message) => {
  return {
    validator: Number.isInteger,
    message: message || "{PATH} must be an integer.",
  };
};
