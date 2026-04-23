/**
 * Environment configuration manager.
 * Reads environment variables and provides typed access
 * across the entire framework.
 */
export const ENV = {
  baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',

  users: {
    standard: {
      username: process.env.STANDARD_USER ?? 'standard_user',
      password: process.env.TEST_PASSWORD ?? 'secret_sauce',
    },
    locked: {
      username: process.env.LOCKED_USER ?? 'locked_out_user',
      password: process.env.TEST_PASSWORD ?? 'secret_sauce',
    },
    performance: {
      username: process.env.PERFORMANCE_USER ?? 'performance_glitch_user',
      password: process.env.TEST_PASSWORD ?? 'secret_sauce',
    },
  },

  environment: process.env.ENV ?? 'staging',
  isHeadless: process.env.HEADLESS !== 'false',
  slowMo: Number(process.env.SLOW_MO ?? 0),
} as const;
