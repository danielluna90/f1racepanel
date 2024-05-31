import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.use("/docs", express.static("docs"));

app
  .listen(port, () => {
    console.log("Server running at PORT: ", port);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
