/* eslint-disable @typescript-eslint/no-magic-numbers */
export const REG_EXP_FOR_PASS_VALIDATION = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
export const ONE_HOUR_IN_SECONDS = ONE_HOUR_IN_MILLISECONDS / 1000;
export const DAY_IN_MILLISECONDS = ONE_HOUR_IN_MILLISECONDS * 24;
export const DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
export const ACCESS_TOKEN_KEY = 'access';
export const REFRESH_TOKEN_KEY = 'refresh';
export const CONFIRM_TOKEN_KEY = 'confirm';
export const FORGOT_TOKEN_KEY = 'forgot';
