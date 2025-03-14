const configServer = {
  BACKEND_URL: process.env.BACKEND_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_KEY_PREFIX: process.env.SESSION_KEY_PREFIX ?? 'next',
  SESSION_TIME_DAY: process.env.SESSION_TIME_DAY ? Number(process.env.SESSION_TIME_DAY) : 7,
};

export default configServer;
