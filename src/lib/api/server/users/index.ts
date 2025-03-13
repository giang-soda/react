import { routeParams } from '@/lib/helpers/common';
import fetcher, { IResponse, IResponseList } from '../../';
import { IUser } from '../../interfaces/user';
import endpoint from '../endpoint';
import configServer from '@/config/config-server';
import { IBase } from '@/lib/helpers/interfaces';

export const usersList = async (params?: IBase): Promise<IResponseList<IUser>> => {
  const res = await fetcher(`${configServer.BACKEND_URL}${endpoint.users.list}`, {
    params,
  });

  return res.data;
};

export const usersDetail = async (id: number): Promise<IUser> => {
  const res: IResponse<IUser> = await fetcher(
    `${configServer.BACKEND_URL}${routeParams(endpoint.users.detail, { id })}`,
  );

  return res.data;
};
