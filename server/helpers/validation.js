/* eslint-disable import/prefer-default-export */

import {
  imgArraysOfExtensions,
} from '../constants/objectConstants';

export const isImageValid = (imageURL) => {
  const imgExtension = imageURL.split('.');
  const currentImgExtension = imgExtension[imgExtension.length - 1];
  const isExtensionExist = imgArraysOfExtensions.includes(currentImgExtension);
  return isExtensionExist;
};
