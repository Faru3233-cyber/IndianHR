import type { Config } from 'next-i18n-router/dist/types';

export const i18n: Config = {
  defaultLocale: 'en',
  locales: ['en', 'ar'],
};

export type Locale = (typeof i18n)['locales'][number];
