import express, { Request, Response } from "express";

import APIRouter from "./src/api.ts";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/v1", APIRouter);
app.use("/docs", express.static("docs"));

app
  .listen(port, () => {
    console.log("Server running at PORT: ", port);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
