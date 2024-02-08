const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const costsRoutes = require("./routes/costsRoutes");

//enabling environment variables
dotenv.config({ path: `./config.env` });

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.options("*", cors());

//getting DATABASE environment variable
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//connecting to DataBase
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

//every path stat with /api
app.use("/api", costsRoutes);

//which port it would run on localhost
const PORT = process.env.PORT || 3000;

//creating the localhost and port we will listen to
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
