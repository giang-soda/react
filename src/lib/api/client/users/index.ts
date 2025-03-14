import endpoint from '../endpoint';
import fetcher from '../../';
import { IBase, IResponseList, IUser } from '@/lib/interfaces';
import { routeParams } from '@/lib/helpers/common';

export const usersList = async (params?: IBase): Promise<IResponseList<IUser>> => {
  const res = await fetcher(endpoint.users.list, {
    params,
  });

  return res.body;
};

export const usersDetail = async (id: number): Promise<IUser> => {
  const res = await fetcher(routeParams(endpoint.users.detail, { id }));

  return res.body;
};
