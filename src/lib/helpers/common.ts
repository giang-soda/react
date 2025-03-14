import { IBase } from '../interfaces';

export const routeParams = (url: string, params: IBase) => {
  for (const keyParam in params) {
    url = url.replaceAll(`:${keyParam}`, params[keyParam]);
  }
  return url;
};
