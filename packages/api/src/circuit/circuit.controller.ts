import { APIErrorCodes, APIException } from 'lib/middleware';
//import { DatabaseTypes, ErrorResponse, ObjectTypes } from 'f1racepanel-common';
//import { Request, RequestHandler, Response } from 'express';
//import { prisma } from 'lib/prisma';

import { Request, RequestHandler } from 'express';
import { ObjectTypes } from 'f1racepanel-common';

export const createPost: RequestHandler = (
  req: Request<unknown, unknown, ObjectTypes.Circuit>
  //res: Response<ErrorResponse | DatabaseTypes.Circuit>
) => {
  // const circuit = await prisma.circuit.create({
  //   data: {
  //     name: 'test',
  //     country: 'is',
  //     date_opened: '2020-01-01',
  //     layouts: {
  //       create: {
  //         first_year: 2023,
  //         last_year: 2024,
  //         track_length: 3.04,
  //         race_lap_record: {
  //           create: {
  //             time: '1.24.000',
  //             driver: {
  //               connect: {
  //                 id: '1d3baf90-a43a-4485-8fb1-0303e884860c',
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   include: {
  //     layouts: {
  //       omit: {
  //         race_lap_record_id: true,
  //       },
  //       include: {
  //         race_lap_record: true,
  //       },
  //     },
  //   },
  // });

  throw new APIException(
    `${req.originalUrl} is currently not implemented`,
    APIErrorCodes.UNIMPLEMENTED
  );
};
