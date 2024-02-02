import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(port, () => {
      console.log(`Server running on prot ${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    status: false,
    statusCode,
    message,
  });
});
