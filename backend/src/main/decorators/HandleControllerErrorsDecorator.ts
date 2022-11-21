import { Controller, HttpRequest, HttpResponse } from '../../presentation/contracts';

export class HandleControllerErrorsDecorator implements Controller {
  private readonly controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  public handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const httpResponse = await this.controller.handle(httpRequest);
      return httpResponse;
    } catch (error: any) {
      return {
        statusCode: error.statusCode || 500,
        body: { message: error.message }
      };
    }
  };
}
