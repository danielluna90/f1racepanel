import { PrismaClient } from "f1racepanel-common";
import express, { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

const prisma = new PrismaClient();

app.get("/", async (request: Request, response: Response) => {
  const driver = await prisma.driver.findFirst({
    include: {
      gp_weekends: {
        select: {
          id: true,
        },
      },
    },
  });
  driver?.gp_weekends;
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
