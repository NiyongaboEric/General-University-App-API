/* eslint-disable import/prefer-default-export */
import { isImageValid } from '../../helpers/validation';
import Response from '../../helpers/Response';
import {
  imageIsNotValidMessage,
  usernameRequiredMessage,
  usernameMaximumMessage,
  usernameMinimumMessage,
  usernameCategoryMessage,
  coordinatesRequiredMessage,
  noPhoneNumberDuplicateMessage,
  brandNameAlreadyCreated,
  usernameIsnotAvailable,
  isAuthenticateMessage,
  profileNotCreatedMessage,
} from '../../constants/messages';
import BrandController from '../../controllers/BrandController';
import ProfileService from '../../services/ProfileService';
import BrandService from '../../services/BrandService';

const { errorInputHandler, errorCommonHandler } = Response;

// no brand duplication
const isUserhaveBrandALready = async (profileId) => {
  const query = { profile: profileId };
  const result = await BrandService.getBrand(query);
  return result;
};

export const CreateBrand = async (parent, args, context) => {
  const { coverPhoto } = args;
  if (!context.user) {
    return Response.errorAuthHandler(isAuthenticateMessage);
  }
  const { user: { _id: userId } } = context;
  const getAuthUserProfile = await ProfileService.getUserProfile(userId);

  if (!getAuthUserProfile) {
    return Response.errorAuthHandler(profileNotCreatedMessage);
  }
  const { _id: profileId } = getAuthUserProfile;
  const newBrandBrandInfo = args;
  newBrandBrandInfo.profile = profileId;
  newBrandBrandInfo.isPhoneVerified = true;
  newBrandBrandInfo.role = 'owner';

  const userBrandResult = await isUserhaveBrandALready(profileId);
  if (userBrandResult) {
    const { username } = userBrandResult.brand;
    return errorCommonHandler(`${brandNameAlreadyCreated}. It is called ${username}`);
  }

  const isImage = isImageValid(coverPhoto);
  if (!isImage) {
    return errorInputHandler(imageIsNotValidMessage);
  }

  // Validate username
  if (newBrandBrandInfo.username.trim() === 'NotFoundUsername') {
    return errorInputHandler(usernameIsnotAvailable);
  }
  if (newBrandBrandInfo.username.trim().length === 0) {
    return errorInputHandler(usernameRequiredMessage);
  }
  if (newBrandBrandInfo.username.length > 16) {
    return errorInputHandler(usernameMaximumMessage);
  }
  if (newBrandBrandInfo.username.length === 0) {
    return errorInputHandler(usernameMinimumMessage);
  }
  if (!/^[a-zA-Z0-9_]{1,15}$/.test(newBrandBrandInfo.username)) {
    return errorInputHandler(usernameCategoryMessage);
  }

  // validate location
  if (newBrandBrandInfo.userLocation.length === 0) {
    return errorInputHandler(coordinatesRequiredMessage);
  }

  // validate duplicate contact
  const combineNumbers = [
    newBrandBrandInfo.ownerContact,
    newBrandBrandInfo.witnessContactOne,
    newBrandBrandInfo.witnessContactTwo,
  ];
  const isContactDuplicate = [...new Set(combineNumbers)].length;
  if (isContactDuplicate !== 3) {
    return errorInputHandler(noPhoneNumberDuplicateMessage);
  }

  const newBrand = await BrandController.createBrand(newBrandBrandInfo);
  return newBrand;
};
