const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});
const app = express();
const userRoute = require("./routes/userRoute");
const propertyRoute = require("./routes/propertyRoute");
const buyerRoute = require("./routes/buyerRoute");
connectDB();

app.use(express.json({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//routes
app.use("/users", userRoute);
app.use("/properties", propertyRoute);
app.use("/buyer", buyerRoute);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server listening on ${PORT}`));
