import { Any, IBase } from './base';

export interface IRequestList extends IBase {
  limit?: number;
  offset?: number;
}

export interface IResponseList<T> {
  total: number;
  items: Array<T>;
}

export interface IResponse<T> {
  data: T;
}

export interface IRequestInit extends RequestInit {
  params?: Any;
}
