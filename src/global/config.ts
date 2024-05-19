interface IConfig {
  BASE_URL: string | undefined;
}

export default function loadConfig(): IConfig {
  return {
    BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
  };
}
