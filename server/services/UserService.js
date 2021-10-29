import uuid from 'uuid/v4';
import User from '../models/user';
import AuthenticateToken from '../helpers/AuthenticateToken';
import CommonQueries from './queries/CommonQueries';
import StyleSimilarObject from '../helpers/StyleSimilarObject';
import {
  socialAuthObjectResponse,
} from '../constants/objectConstants';
import Response from '../helpers/Response';
import {
  userLogoutSuccessMessage,
} from '../constants/messages';
import ProfileService from './ProfileService';

/**
 * @exports
 * @class UserService
 */

const {
  destructAndReturnAnyObject,
} = StyleSimilarObject;

class UserService {
  /**
   * User can be able to authenticate by using Google && Github && Facebook && Twitter
   * @static
   * @param {object} providerData auth incoming data
   * @param {object} signupType provider name
   * @param {object} userName user name
   * @memberof UserService
   * @returns {object} data
  */
  static async commonAuthUser(prividerData, signupType, userName) {
    const userData = {
      email: prividerData.email,
      signupType,
      publicId: uuid(),
    };
    const query = {
      email: prividerData.email,
    };

    if (!prividerData.email) {
      const message = `Dear ${userName} you don't have an email address. Please create it and try again`;
      throw (message);
    }

    /**
     * Is user Exist === true
     * Don't create new public ID dynamically
     * Dont create new token unless unless is empty
     * Everything is setup
     * Redirect successfully
     */

    const isUserExist = await CommonQueries.findOne(User, query);
    const isUserExistGetToken = isUserExist ? isUserExist.token : null;
    const isValidToken = AuthenticateToken.validateToken(isUserExistGetToken);
    if (isUserExist && isValidToken) {
      if (!isUserExist.token) { // handle logout
        return UserService.handleUserSocialAuth(isUserExist);
      }
      return isUserExist;
    }
    const findCreateUser = await CommonQueries.findOrCreate(User, query, userData);
    await UserService.handleUserSocialAuth(findCreateUser);
    return findCreateUser;
  }

  /**
   * update current user info accordingly
   * @static
   * @param {object} userInfo user id
   * @memberof UserService
   * @returns {object} data
  */
  static async handleUserSocialAuth(userInfo) {
    const findIfUserCreateProfile = await ProfileService.isUserProfileExist(userInfo);
    const payload = destructAndReturnAnyObject(findIfUserCreateProfile, socialAuthObjectResponse);
    userInfo.token = AuthenticateToken.createToken(payload);
    userInfo.isVerified = true;
    await userInfo.save();
    return userInfo;
  }

  /**
   * Deserialize social authenticate user
   * @static
   * @param {object} id user id
   * @param {object} done callback
   * @memberof UserService
   * @returns {object} data
  */
  static deserializeAuthUser(id, done) {
    try {
      return User.findById(id, (err, user) => {
        done(err, user);
      });
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }

  /**
   * Logout a user
   * @static
   * @param {object} user current auth user
   * @memberof UserService
   * @returns {object} data
  */
  static async logoutUser(user) {
    try {
      const query = {
        _id: user._id,
      };
      const cleanTokenObject = {
        token: '',
      };
      await CommonQueries.findOneAndUpdate(User, query, cleanTokenObject);
      return {
        message: userLogoutSuccessMessage,
      };
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }
}

export default UserService;
