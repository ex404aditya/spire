import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";

//My routes
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
connectDB();



app.use(express.json()); // to parse json data in req.body
app.use(express.urlencoded({ extended: true })); // to parse form data in req.body
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
