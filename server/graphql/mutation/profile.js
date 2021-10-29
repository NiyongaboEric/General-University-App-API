/* eslint-disable import/prefer-default-export */

import {
  isImageValid,
} from '../../helpers/validation';
import Response from '../../helpers/Response';
import ProfileService from '../../services/ProfileService';
import { imageIsNotValidMessage, isAuthenticateMessage, allInputNotCorrectMessage } from '../../constants/messages';
import { isProfileValid } from '../../utils/validation/profile';


const { errorInputHandler } = Response;

export const CreateProfile = async (parent, args, context) => {
  if (!context.user) {
    return Response.errorAuthHandler(isAuthenticateMessage);
  }
  const {
    user: {
      _id: authUserId,
      publicId,
      signupType,
      isVerified,
    },
  } = context;

  const tokenInfo = {
    publicId,
    signupType,
    isVerified,
    profileComplete: true,
  };

  const {
    firstName,
    lastName,
    jobPosition,
    address,
    phoneNumber,
    gender,
    profileImage,
  } = args;
  const newUserProfile = {
    firstName,
    lastName,
    profileImage,
    jobPosition,
    address,
    phoneNumber,
    gender,
    user: authUserId,
  };
  const isProfileInputValid = isProfileValid(args);
  if (isProfileInputValid.error) {
    return errorInputHandler(allInputNotCorrectMessage, isProfileInputValid.error.details);
  }
  const isImage = isImageValid(profileImage);
  if (profileImage && !isImage) {
    return errorInputHandler(imageIsNotValidMessage);
  }
  const createdProfile = await ProfileService.createProfile(newUserProfile, tokenInfo);
  return createdProfile;
};
