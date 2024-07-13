import { ErrorResponse, Prisma } from 'f1racepanel-common';
import { NextFunction, Request, Response } from 'express';

export default function ErrorHandler(
  err: unknown,
  _: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        res.status(400).send({
          code: 400,
          description: 'Unique field is not unique.',
        });
        break;

      case 'P2025':
        res.status(400).send({
          code: 400,
          description: 'Entity not found.',
        });
        break;

      default:
        res.status(500).send({
          code: 500,
          description: `Unknown DB error: ${err.code}.`,
        });
        break;
    }
  } else {
    res.status(500).send({
      code: 500,
      description: 'Unknown server error.',
    });
  }

  next();
}
