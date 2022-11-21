export type RequestUser = {
  id: number
  username: string
  account: string
};

export type HttpRequest = {
  body: any
  params?: any
  user?: RequestUser
};

export type HttpResponse = {
  statusCode: number
  body: any
};
