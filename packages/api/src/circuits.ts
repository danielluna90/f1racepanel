import express, { Request, Response } from 'express';
const CircuitRoutes = express.Router();

import { prisma } from './prisma';

CircuitRoutes.get('/', async (req: Request, res: Response) => {
  const circuit = await prisma.circuit.findMany();

  res.send(circuit);
});

CircuitRoutes.get('/:CircuitID', async (req: Request, res: Response) => {
  const circuitID = req.params.CircuitID;

  const circuit = await prisma.driver.findUnique({
    where: {
      id: circuitID,
    },
  });

  res.send(circuit);
});

export default CircuitRoutes;
