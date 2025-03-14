import endpoint from '../endpoint';
import fetcher from '../..';
import { IBase, IAuthLogin } from '@/lib/interfaces';
import configServer from '@/config/config-server';

export const authLogin = async (body: IAuthLogin): Promise<IBase> => {
  
  return await fetcher(configServer.BACKEND_URL + endpoint.auth.login, {
    method: 'post',
    body: JSON.stringify(body),
  });
};
