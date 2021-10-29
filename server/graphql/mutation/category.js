/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import CategoryController from '../../controllers/CategoryController';
import { isAddBrandItemValid, isItemImageValid } from '../../utils/validation/items/addItemsValidation';
import Response from '../../helpers/Response';
import { itemStatus } from '../../constants/objectConstants';
import { isAuthenticateMessage } from '../../constants/messages';

const {
  addBrandItem,
} = CategoryController;

export const AddBrandItem = async (parent, args, context) => {
  const { user } = context;
  if (!user) {
    return Response.errorAuthHandler(isAuthenticateMessage);
  }
  const hasErrors = isAddBrandItemValid(args);
  if (hasErrors) {
    return Response.errorInputHandler('Input is not correct', { validationError: hasErrors.details });
  }
  const isImageValid = isItemImageValid(args);
  if (isImageValid.length !== 0) {
    return Response.errorInputHandler('Image is not correct', { validationError: isImageValid });
  }
  const newData = args;
  const addedStatus = itemStatus[0];
  newData.itemStatus = addedStatus;
  newData.publicId = uuidv4();
  const result = await addBrandItem(newData, user);
  return result;
};
