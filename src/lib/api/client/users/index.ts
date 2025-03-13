import endpoint from '../endpoint';
import fetcher, { IResponseList } from '../../';
import { IBase } from '@/lib/helpers/interfaces';
import { IUser } from '../../interfaces/user';
import { routeParams } from '@/lib/helpers/common';

export const usersList = async (params?: IBase): Promise<IResponseList<IUser>> => {
  const res = await fetcher(endpoint.users.list, {
    params,
  });

  return res;
};

export const usersDetail = async (id: number): Promise<IUser> => {
  const res: IUser = await fetcher(routeParams(endpoint.users.detail, { id }));

  return res;
};
