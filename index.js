/*
 * Author: Sultan Ahmed Sanjar
 * Description : this is the main index file who will handle all the sub files for this socail web application
 * Date: 18/06/2023
 * Copyright : abibdipto@gmail.com || sultan@2023
 */

// dependencies

// internal imports

import { register } from "./controllers/auth";

// external imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "http";

// configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors);
app.use("/assest", express.static(path.join(__dirname, "public/assets")));

// file Storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// MOONGOOSE SETUP

const PORT = process.env.PORT || 6001;

// routes with files

app.post("/auth/register", upload.single("picture"), register);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Database Connected Successfully"))
  .catch(err => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`listening on port${PORT}`);
});
