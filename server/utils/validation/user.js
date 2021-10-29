/* eslint-disable import/prefer-default-export */
export const validateUserName = (input) => {
  return /^[a-zA-Z0-9_]{1,15}$/.test(`${input}`);
};
