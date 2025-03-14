import { IBase, IRequestInit } from '@/lib/interfaces';

/**
 * Filters out null, undefined, and falsy values from the given object or URLSearchParams.
 *
 * @param obj - The object or URLSearchParams to filter.
 * @returns A string representing the URLSearchParams without null, undefined, or falsy values.
 */
const filterNotNull = (obj: IBase | URLSearchParams): string => {
  const _typeURLSearchParams = (objUrl: URLSearchParams): string => {
    for (const [key, value] of objUrl.entries()) {
      if (!value || value === '' || value === '0' || value === 'null' || value === 'undefined') {
        objUrl.delete(key);
      }
    }
    return objUrl.toString();
  };

  if (obj instanceof URLSearchParams) {
    return _typeURLSearchParams(obj);
  }

  const params: IBase = { ...obj };

  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  return new URLSearchParams(params).toString();
};

const fetcher = async (url: string, options?: IRequestInit) => {
  options = {
    // cache: 'no-store',
    // next: {
    //   revalidate: 0
    // },
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  if (options.params) {
    url = `${url}?${filterNotNull(options.params)}`;
  }

  const res = await fetch(url, options);

  return {
    body: await res.json(),
    status: res.status,
    ok: res.ok
  }
};

export default fetcher;
