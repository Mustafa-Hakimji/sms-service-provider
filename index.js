const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRouter = require("./src/routes/userRoutes");
const smsRouter = require("./src/routes/smsRoutes");
const staffRouter = require("./src/routes/staffRoutes");
const logInOut = require("./src/routes/logInOut");

dotenv.config();

const app = express();

const port = 9000;

app.use(cors()); // Allow all origins
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/send", smsRouter);
app.use("/staffs", staffRouter);
app.use("/log", logInOut);

const DB = process.env?.MONG_DB_URI?.replace(
  "<PASSWORD>",
  process?.env?.DB_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => console.log("Connected to Data Base Successfully"))
  .catch((err) => console.log("Fail Database connection ", err));

app.listen(port, () => {
  console.log(`Your app is listening on ports http://localhost:${port}`);
});
