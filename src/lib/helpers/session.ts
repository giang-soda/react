'use server';

import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import configServer from '@/config/config-server';
import { IBase } from '../interfaces';
import { cookies } from 'next/headers';

const encodedKey = new TextEncoder().encode(configServer.SESSION_SECRET);
const SESSION_KEY_LOGIN = 'session';

function keySession(key: string = SESSION_KEY_LOGIN) {
  return configServer.SESSION_KEY_PREFIX + key;
}

const secondsUnixExpired = (time: number = configServer.SESSION_TIME_DAY) => {
  return time * 24 * 60 * 60 * 1000;
  // return time * 1000;
};

async function encrypt(payload: IBase) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${configServer.SESSION_TIME_DAY}d`)
    .sign(encodedKey);
}

async function decrypt(session: string | undefined = '') {
  const { payload } = await jwtVerify(session, encodedKey, {
    algorithms: ['HS256'],
  });
  return payload;
}

/***************************************
 * export session function
 */

export async function createSession(payload: IBase, key: string = SESSION_KEY_LOGIN) {
  const expiresAt = new Date(Date.now() + secondsUnixExpired());
  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set(keySession(key), session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'strict',
    path: '/',
  });
}

export async function getSession(key: string = SESSION_KEY_LOGIN) {
  const cookieStore = await cookies();
  const sessionVal = cookieStore.get(keySession(key))?.value;

  return await decrypt(sessionVal);
}

export async function updateSession(key: string = SESSION_KEY_LOGIN) {
  const cookieStore = await cookies();
  const session = cookieStore.get(keySession(key))?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  await createSession(payload);
}

export async function deleteSession(key: string = SESSION_KEY_LOGIN) {
  const cookieStore = await cookies();
  cookieStore.delete(keySession(key));
}

export const getKeyCookie = async (key?: string) => {
  return keySession(key);
};
