/* eslint-disable no-underscore-dangle */
import User from '../models/user';
import Profile from '../models/profile';
import Brand from '../models/brand';
import CommonQueries from './queries/CommonQueries';
import Response from '../helpers/Response';
import {
  userNotFound,
  profileNotCreatedMessage,
} from '../constants/messages';
import AuthenticateToken from '../helpers/AuthenticateToken';

/**
 * @exports
 * @class ProfileService
 */

class ProfileService {
  /**
   * User can be able to create profile
   * @static
   * @param {object} data user profile data
   * @param {object} tokenInfo user token information
   * @memberof ProfileService
   * @returns {object} data
  */
  static async createProfile(data, tokenInfo) {
    try {
      let query = {
        user: data.user,
      };
      const targetTable = 'user';
      const isIdExist = await CommonQueries.findOneByField(Profile, query);
      if (isIdExist) {
        /*
         * Update the created profile
         * The following field are optional
         * @param {string} gender to specify the sex
         * @param {string} jobPosition to specify the current position
         * @param {string} share the address
         * @param {string} phoneNumber share phone number
         * @param {string} profileImage upload profile picture
        */

        await CommonQueries
          .UpdateItem(Profile,
            {
              _id: isIdExist._id,
            },
            {
              $set:
              {
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                profileImage: data.profileImage,
                jobPosition: data.jobPosition,
                address: data.address,
                phoneNumber: data.phoneNumber,
              },
            });
        const updatedToken = await CommonQueries.findOneByField(Profile, query, targetTable);
        return updatedToken;
      }
      const newToken = AuthenticateToken.createToken(tokenInfo);
      const createNewProfile = await CommonQueries.createNewRecord(Profile, data);
      await CommonQueries
        .UpdateItem(User,
          {
            _id: data.user,
          },
          {
            $set:
            {
              token: newToken,
            },
          });
      const { _id } = createNewProfile;
      query = {
        _id,
      };
      const updatedToken = await CommonQueries.findOneByField(Profile, query, targetTable);
      return updatedToken;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }

  /**
   * User can be able to view profile
   * @static
   * @param {object} id user id
   * @memberof ProfileService
   * @returns {object} data
  */
  static async viewProfile(data) {
    try {
      const findUserAuth = await CommonQueries.findOneByField(User, data);

      // reject if user doesnot extst
      if (!findUserAuth) {
        return Response.errorCommonHandler(userNotFound);
      }
      const { _id: userId } = findUserAuth;
      const fetchUserProfile = await CommonQueries.findOneByField(Profile, { user: userId }, 'user');

      // reject if profile doesnot exist
      if (!fetchUserProfile) {
        return Response.errorCommonHandler(profileNotCreatedMessage);
      }

      const { _id: profileId } = fetchUserProfile;
      const fetchBrand = await CommonQueries.findOneByField(Brand, { profile: profileId }, 'brand');

      return {
        profile: {
          ...fetchUserProfile._doc,
        },
        user: {
          ...fetchUserProfile._doc.user._doc,
          password: null,
          token: null,
          _id: null,
        },
        brand: fetchBrand,
      };
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }

  /**
   * Verify the user profile for the first time
   * @static
   * @param {object} id user id
   * @memberof ProfileService
   * @returns {object} data
  */
  static async isUserProfileExist(data) {
    const query = {
      user: data._id,
    };
    const isProfile = await CommonQueries.findOne(Profile, query);
    const newfindCreateUser = { ...data };
    if (!isProfile) {
      newfindCreateUser._doc.profileComplete = isProfile;
      return newfindCreateUser._doc;
    }
    newfindCreateUser._doc.profileComplete = true;
    return newfindCreateUser._doc;
  }

  /**
   * Get user profile information
   * @static
   * @param {object} userId user id
   * @memberof ProfileService
   * @returns {object} data
  */
  static async getUserProfile(userId) {
    const userProfileInfo = await CommonQueries.findOne(Profile, { user: userId });
    return userProfileInfo;
  }
}

export default ProfileService;
