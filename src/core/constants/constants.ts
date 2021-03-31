/* eslint-disable @typescript-eslint/no-magic-numbers */
export const REG_EXP_FOR_PASS_VALIDATION = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
export const DAY_IN_MILLISECONDS = ONE_HOUR_IN_MILLISECONDS * 24;
export const ONE_HOUR_IN_SECONDS = ONE_HOUR_IN_MILLISECONDS / 1000;
