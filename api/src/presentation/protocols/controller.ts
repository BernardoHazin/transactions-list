import { HttpResponse } from "@/presentation/protocols";

export interface Controller<T = any, S = any> {
  handle: (request: T) => Promise<HttpResponse<S>>;
}
