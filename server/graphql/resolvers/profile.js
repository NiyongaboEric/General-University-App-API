/* eslint-disable import/prefer-default-export */

import ProfileService from '../../services/ProfileService';


export const GetUserProfile = async (parent, args) => {
  const userProfile = await ProfileService.viewProfile(args);
  return userProfile;
};
