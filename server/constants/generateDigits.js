/* eslint-disable import/prefer-default-export */
export const generateVerificationNumber = [0, 1, 2, 3, 4].map((i) => Math.floor(Math.random() * 10)).join('');
