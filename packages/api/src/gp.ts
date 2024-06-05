import express, { Request, Response } from 'express';
const GPRoutes = express.Router();

// import { prisma } from "./prisma";

GPRoutes.get('/:year/:round', (req: Request, res: Response) => {
  const { year, round } = req.params;

  res.send(`Obtaining Round ${round} of the ${year} F1 Season!`);
});

GPRoutes.get('/:year/:round/:session', (req: Request, res: Response) => {
  const { year, round, session } = req.params;

  res.send(
    `Obtaining Session ${session} of Round ${round} of the ${year} F1 Season!`
  );
});

export default GPRoutes;
