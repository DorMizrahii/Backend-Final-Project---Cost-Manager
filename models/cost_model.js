const mongoose = require("mongoose");
const categories = require("../const");
const { isValidDay , getIntegerValidator } = require("../helper");

//Creating a new Schema(collection) of costs
const costItemSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: [true, "Cost item must include a user ID!"],
    validate: getIntegerValidator
  },

  year: {
    type: Number,
    required: [true, "Cost item must include a year!"],
    min: [1900, "Year must be after 1900"],
    max: [2100, "Year must be before 2100"],
    validate: getIntegerValidator
  },

  month: {
    type: Number,
    required: [true, "Cost item must include a month!"],
    min: [1, "Month must be at least 1 (January)"],
    max: [12, "Month must be at most 12 (December)"],
    validate: getIntegerValidator
  },

  day: {
    type: Number,
    required: [true, "Cost item must include a day!"],
    validate: {
      validator: function (value) {
        // Get the year and month from the document
        const year = this.year;
        const month = this.month;

        // Validate the day for the given month and year
        return isValidDay(year, month, value);
      },
      message: (props) =>
        `${props.value} is not a valid day for the provided month and year!`,
    },
  },

  id: {
    default: new Date().getTime(),
    type: Number,
  },

  description: {
    type: String,
    required: [true, "Cost item must include a description!"],
    maxlength: [500, "Description cannot be more than 500 characters"]
  },

  category: {
    type: String,
    required: [true, "Cost item must include a category!"],
    validate: {
      //Only Categories like food housing etc.... ( from the list that was given in the document )
      validator: function (value) {
        return categories.includes(value);
      },
      message: (props) => `${props.value} is not a valid category!`,
    },
  },

  sum: {
    type: Number,
    required: [true, "Cost item must include a sum!"],
    min: 0,
    validate: getIntegerValidator
  },
});

const CostItem = mongoose.model("Costs", costItemSchema);
module.exports = CostItem;
