import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

//My routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//middlewares
app.use(express.json()); // to parse json data in req.body
app.use(express.urlencoded({ extended: true })); // to parse form data in req.body
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
