const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Components/AuthRoute");
const {MONGO_URL, PORT, ORIGIN_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected Successfully"))
  .catch((err) => console.error(err));

app.listen(4000, () => {
  console.log(`Server Started! Running on port: ${PORT}`)
});
app.use(cors({
  origin: [ORIGIN_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);