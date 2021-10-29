/* eslint-disable import/prefer-default-export */
import UserService from '../../services/UserService';

export const LogoutUser = async (parent, args, context) => {
  const { user } = context;
  const userLoggedOut = await UserService.logoutUser(user);
  return userLoggedOut;
};
