import jwt from 'jsonwebtoken';
import config from '../../config/index';
import {
  emptyTokenMessage,
  unknownTokenMessage,
  userNotFound,
  missingTokenMessage,
  AuthenticateAsGuest,
} from '../constants/messages';
import CommonQueries from '../services/queries/CommonQueries';
import User from '../models/user';
import Response from './Response';


const { SECRET_KEY } = config;
const {
  errorAuthHandler,
} = Response;

/**
 * @export
 * @class AuthenticateToken
 */
class AuthenticateToken {
  /**
    * Store data in Jwt
    * @static
    * @param {object} data data object
    * @memberof AuthenticateToken
    * @returns {object} signToken
    */
  static createToken(data) {
    const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1w' });
    return token;
  }

  /**
  * verify token
  * @param {object} req request object
  * @returns {object} user data
  * next
  */

  static async verifyToken(req) {
    const incomingToken = req.headers.authorization.split(' ')[1];
    if (!incomingToken) {
      return errorAuthHandler(emptyTokenMessage);
    }
    if (incomingToken === AuthenticateAsGuest) {
      /**
       * Logged as Guest
       * Token expect to have "Auth::Guest" message
       */
      return null;
    }
    try {
      const userTokeInfo = jwt.verify(incomingToken, SECRET_KEY);
      const { publicId } = userTokeInfo;
      const query = {
        publicId,
      };
      const isUserExist = await CommonQueries.findAllByField(User, query);
      if (isUserExist.length === 0) {
        return errorAuthHandler(userNotFound);
      }
      const { token: savedToken } = isUserExist[0];
      if (!savedToken) {
        return errorAuthHandler(missingTokenMessage);
      }

      if (incomingToken !== savedToken) {
        return errorAuthHandler(unknownTokenMessage);
      }
      return { ...isUserExist[0]._doc, password: null };
    } catch (error) {
      return errorAuthHandler(error);
    }
  }

  /**
  * verify ws token
  * @param {object} connectionParams websocket connection parameter
  * @returns {object} user data
  * next
  */
  static verifyWebsocketToken(connectionParams) {
    try {
      if (connectionParams.headers && connectionParams.headers.authorization) {
        const authUserWSToken = connectionParams.headers.authorization.split(' ')[1];
        return jwt.verify(authUserWSToken, SECRET_KEY, (error, data) => {
          if (error) {
            throw new Error(error);
          }
          return { currentAuthUserWS: data };
        });
      }
      const incomingToken = connectionParams.authorization.split(' ')[1];
      const verifyToken = jwt.verify(incomingToken, SECRET_KEY);
      return { currentAuthUserWS: verifyToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
    * Validate any token
    * @static
    * @param {object} token pass an incoming token
    * @memberof AuthenticateToken
    * @returns {object} error/decode token
  */

  static validateToken(token) {
    try {
      const isVerified = jwt.verify(token, SECRET_KEY);
      return isVerified;
    } catch (error) {
      return false;
    }
  }
}
export default AuthenticateToken;
