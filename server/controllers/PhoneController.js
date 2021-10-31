import Response from '../helpers/Response';
import * as eventNames from '../constants/subscription/eventNames';

/**
 * @exports
 * @class PhoneController
 */

class PhoneController {
  /**
   * We can be able to send phone verification code to users
   * @static
   * @callback {object} nexmo SMS callback
   * @param {string} telephoneNumber should be take the contact number of receiver
   * @param {string} contactOwner should be the person role to receive sms
   * @param {object} pubsub should be the redis pubsub
   * @param {authUser} user should be the current authenticate user
   * @memberof PhoneController
   * @returns {object} object
   */
  static async verificationCode(nexmo, telephoneNumber, contactOwner, pubsub, authUser) {
    try {
      const uniqueCode = [0, 1, 2, 3, 4].map((i) => Math.floor(Math.random() * 10)).join('');
      const from = 'Gen-Agent';
      const to = telephoneNumber;
      const text = `GenAgent wants to verify the ${contactOwner}. ${uniqueCode} is your code.`;

      const phoneVerifiedError = {
        phoneVerified: {
          status: 'error',
          message: `Dear ${contactOwner} we could not be able to verify ${telephoneNumber} contact. Please change it or try again later.`,
          publicId: authUser.publicId,
        },
      };
      const phoneVerifiedSuccess = {
        phoneVerified: {
          status: 'success',
          message: `Dear ${contactOwner} we sent an SMS to provided contact. Please check!`,
          publicId: authUser.publicId,
        },
      };
      await nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
          return pubsub.publish(eventNames.PHONE_VERIFICATION_EVENT, phoneVerifiedError);
        }
        if (responseData.messages[0]['status'] === '0') {
          pubsub.publish(eventNames.PHONE_VERIFICATION_EVENT, phoneVerifiedSuccess);
          return {
            telephoneNumber,
            codeVerification: uniqueCode,
          };
        }
        return pubsub.publish(eventNames.PHONE_VERIFICATION_EVENT, phoneVerifiedError);
      });
      return {
        telephoneNumber,
        codeVerification: uniqueCode,
      };
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }
}

export default PhoneController;
