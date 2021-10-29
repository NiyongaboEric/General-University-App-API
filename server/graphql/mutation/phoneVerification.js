/* eslint-disable import/prefer-default-export */
import Nexmo from 'nexmo';
import index from '../../../config/index';
import PhoneController from '../../controllers/PhoneController';
import validate from '../../utils/validation/PhoneVerification';
import Response from '../../helpers/Response';
import { isAuthenticateMessage } from '../../constants/messages';

const { verificationCode } = PhoneController;
const { NEXMO_API_KEY, NEXMO_API_SECRET } = index;

const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET,
});

export const PhoneVerification = (parent, args, { pubsub, user: authUser }) => {
  if (!authUser) {
    return Response.errorAuthHandler(isAuthenticateMessage);
  }
  const { telephoneNumber, contactOwner } = args;
  const isContactValid = validate(telephoneNumber);
  if (isContactValid.length > 0) {
    return Response.errorInputHandler(isContactValid);
  }
  return verificationCode(nexmo, `+${telephoneNumber}`, contactOwner, pubsub, authUser);
};
