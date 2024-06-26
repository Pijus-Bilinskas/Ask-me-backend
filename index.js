import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./src/routes/user.js";
import questionRoutes from "./src/routes/question.js";

import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_CONNECTION)
.then(() => console.log("Connected to DB"))
.catch((err) => {
    console.log("ERR", err)
});

app.use(userRoutes);
app.use(questionRoutes);

app.use((req, res) => {
    return res.status(404).json({ message: "This endpoint des not exist" });
  });

app.listen(process.env.PORT, () => {
    console.log("App started on port", process.env.PORT);
  });