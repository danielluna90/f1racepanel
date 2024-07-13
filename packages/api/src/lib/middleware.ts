import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorResponse } from 'f1racepanel-common';
import Zod from 'zod';

// TODO: Remove these functions eventually
// export function JSONErrorHandler(
//   _err: unknown,
//   _req: Request,
//   res: Response<ErrorResponse>,
//   _next: NextFunction
// ) {
//   res.status(400).send({
//     code: 400,
//     description: 'JSON is not correctly formatted in body',
//   });
// }

// export function ErrorHandler(
//   err: unknown,
//   _: Request,
//   res: Response<ErrorResponse>,
//   next: NextFunction
// ) {
//   if (err instanceof Prisma.PrismaClientKnownRequestError) {
//     switch (err.code) {
//       case 'P2002':
//         res.status(400).send({
//           code: 400,
//           description: 'Unique field is not unique.',
//         });
//         break;

//       case 'P2025':
//         res.status(400).send({
//           code: 400,
//           description: 'Entity not found.',
//         });
//         break;

//       default:
//         res.status(500).send({
//           code: 500,
//           description: `Unknown DB error: ${err.code}.`,
//         });
//         break;
//     }
//   } else {
//     res.status(500).send({
//       code: 500,
//       description: 'Unknown server error.',
//     });
//   }

//   next();
// }

const ValidateRequestField = (
  schema: Zod.AnyZodObject,
  obj: unknown,
  res: Response<ErrorResponse>,
  next: NextFunction,
  strict = true
) => {
  try {
    strict ? schema.parse(obj) : schema.partial().parse(obj);
    next();
  } catch (error) {
    res.status(400).send({
      code: 400,
      description: 'Schema validation failed.',
    });
  }
};

export const ValidateBody =
  (schema: Zod.AnyZodObject, strict = true): RequestHandler =>
  (
    req: Request<unknown, unknown, unknown>,
    res: Response<ErrorResponse>,
    next: NextFunction
  ) => {
    ValidateRequestField(schema, req.body, res, next, strict);
  };

export const ValidateParams =
  (schema: Zod.AnyZodObject, strict = true): RequestHandler =>
  (
    req: Request<unknown, unknown, unknown>,
    res: Response<ErrorResponse>,
    next: NextFunction
  ) => {
    ValidateRequestField(schema, req.params, res, next, strict);
  };

export const ValidateQueries =
  (schema: Zod.AnyZodObject, strict = true): RequestHandler =>
  (
    req: Request<unknown, unknown, unknown>,
    res: Response<ErrorResponse>,
    next: NextFunction
  ) => {
    ValidateRequestField(schema, req.query, res, next, strict);
  };
