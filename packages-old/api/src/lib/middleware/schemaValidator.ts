import { APIErrorCodes, APIException } from 'lib/middleware';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorResponse } from 'f1racepanel-common';
import QueryString from 'qs';
import { z } from 'zod';

const ValidateRequestField = (
  schema: Zod.AnyZodObject,
  obj: unknown,
  next: NextFunction,
  strict = true
) => {
  try {
    strict ? schema.parse(obj) : schema.partial().parse(obj);
    next();
  } catch (error) {
    throw new APIException(
      'ValidateRequestField',
      APIErrorCodes.SCHEMA_VALIDATION_FAILED
    );
  }
};

export const ValidateBody =
  (schema: Zod.AnyZodObject, strict = true): RequestHandler =>
  (
    req: Request<unknown, unknown, unknown>,
    _: Response<ErrorResponse>,
    next: NextFunction
  ) => {
    ValidateRequestField(schema, req.body, next, strict);
  };

export const ValidateParams =
  (schema: Zod.AnyZodObject, strict = true): RequestHandler =>
  (
    req: Request<unknown, unknown, unknown>,
    _: Response<ErrorResponse>,
    next: NextFunction
  ) => {
    ValidateRequestField(schema, req.params, next, strict);
  };

export const ValidateQueries =
  (schema: Zod.AnyZodObject, strict = true): RequestHandler =>
  (req: Request<unknown, unknown, unknown>, _, next: NextFunction) => {
    try {
      let obj: z.infer<typeof schema>;
      strict
        ? (obj = schema.parse(req.query))
        : (obj = schema.partial().parse(req.query));

      const baseURL = 'https://localhost';
      const url = new URL(req.url, baseURL);

      url.search = QueryString.stringify(obj);
      req.url = url.toString().substring(baseURL.length);

      next();
    } catch (error) {
      throw new APIException(
        'ValidateQueries',
        APIErrorCodes.SCHEMA_VALIDATION_FAILED
      );
    }
  };
