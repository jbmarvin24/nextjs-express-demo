import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export default function (validator: (data: any) => void) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await validator(req.body);
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).send(error.value);
      } else {
        console.log(error);
        return res.status(500).send('Internal Server Error, Please the see logs for more info.');
      }
    }
  };
}
