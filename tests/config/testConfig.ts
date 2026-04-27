declare const process: { env: { BASE_URL?: string } };

export const testConfig = {
  baseURL: process.env.BASE_URL || 'https://staging.funzweb.com',
  timeout: 60000,
  retries: 0,
};