import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorResponse } from 'f1racepanel-common';
import Zod from 'zod';

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
