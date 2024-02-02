import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose
    .connect("mongodb://127.0.0.1:27017/blog")
    .then(
        app.listen(3000, () => {
            console.log(`Server running on prot 3000`)
        })
    )
    .catch(err => {
        console.log(err)
    })