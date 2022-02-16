import { HttpResponse } from "@/presentation/protocols";

export const ok = <T>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data,
});

export const notFound = (): HttpResponse => ({
  statusCode: 404,
});
