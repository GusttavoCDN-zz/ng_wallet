export type HttpRequest<T = any> = {
  body: T
};

export type HttpResponse<T = any> = {
  statusCode: number
  body: T
};
