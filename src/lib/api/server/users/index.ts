import { routeParams } from '@/lib/helpers/common';
import fetcher from '../../';
import endpoint from '../endpoint';
import configServer from '@/config/config-server';
import { IBase, IResponseList, IUser } from '@/lib/interfaces';

export const usersList = async (params?: IBase): Promise<IResponseList<IUser>> => {
  const res = await fetcher(`${configServer.BACKEND_URL}${endpoint.users.list}`, {
    params,
  });

  return res.body.data;
};

export const usersDetail = async (id: number): Promise<IUser> => {
  const res = await fetcher(
    `${configServer.BACKEND_URL}${routeParams(endpoint.users.detail, { id })}`,
  );

  return res.body.data;
};
