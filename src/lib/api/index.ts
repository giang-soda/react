import { Any, IBase } from "@/lib/helpers/interfaces";

export interface IResponseList<T> {
  total: number;
  items: Array<T>;
}

interface IRequestInit extends RequestInit {
  params?: Any;
}

const filterNotNull = (obj: IBase) => {
  if (obj instanceof URLSearchParams ) {
    obj = Object.fromEntries(obj.entries());
  }

  const params = Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => !!value)
  );

  return new URLSearchParams(params).toString();
}

const fetcher = async (url: string, options?: IRequestInit) => {
  options = {
    // cache: 'no-store',
    // next: {
    //   revalidate: 0 
    // },
    ...options,
  };

  if (options.params) {
    url = `${url}?${filterNotNull(options.params)}`;
  }
  console.log(1111, url)
  const res = await fetch(url, options);

  return res.json();
};

export default fetcher;
