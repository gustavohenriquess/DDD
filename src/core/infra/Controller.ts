import { HttpResponse } from './HttpResponse';

export interface Controller<T = any> {
  handle(_request: T): Promise<HttpResponse>;
}
