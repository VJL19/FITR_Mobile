interface IConfig {
  BASE_URL: string | undefined;
  SUCCESS_URL: string | undefined;
  SOCKET_URL: string | undefined;
}

export default function loadConfig(): IConfig {
  return {
    BASE_URL: process.env.EXPO_PUBLIC_BASE_SERVER_URL,
    SUCCESS_URL: process.env.EXPO_PUBLIC_BASE_SUCCESS_URL,
    SOCKET_URL: process.env.EXPO_PUBLIC_SOCKET_URL,
  };
}
