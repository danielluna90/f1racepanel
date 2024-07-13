import { ErrorResponse, Prisma } from 'f1racepanel-common';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import Zod from 'zod';

export function ErrorHandler(
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

export const Validate =
  (schema: Zod.AnyZodObject): RequestHandler =>
  (
    req: Request<unknown, unknown, unknown>,
    res: Response<ErrorResponse>,
    next: NextFunction
  ) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      console.log(error);
      res.status(400).send({
        code: 400,
        description: 'Bad Request: Schema is not Valid',
      });
    }
  };
