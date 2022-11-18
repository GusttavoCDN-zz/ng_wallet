import { Request, Response } from 'express';
import { Controller } from '../../controllers/Controller';
import { HttpRequest, HttpResponse } from '../../controllers/Http';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
