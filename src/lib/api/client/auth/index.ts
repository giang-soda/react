import endpoint from '../endpoint';
import fetcher from '../..';
import { IBase, IAuthLogin } from '@/lib/interfaces';

export const authLogin = async (body: IAuthLogin): Promise<IBase> => {
  const res = await fetcher(endpoint.auth.login, {
    method: 'post',
    body: JSON.stringify(body),
  });

  return res.body;
};
