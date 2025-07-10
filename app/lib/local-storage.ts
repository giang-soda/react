export const getInstance = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage;
};

export const getItem = (key: string) => {
  return getInstance()?.getItem(key);
};

export const setItem = (key: string, value: string) => {
  getInstance()?.setItem(key, value);
};

export const removeItem = (key: string) => {
  getInstance()?.removeItem(key);
};
