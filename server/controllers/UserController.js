import UserService from '../services/UserService';
import config from '../../config/index';

/**
 * @exports
 * @class UserController
 */

class UserController {
  /**
   * User can be able to sign up with facebook
   * @static
   * @param {object} accessToken Google access token
   * @param {object} refreshToken should be token
   * @param {object} profile profile data
   * @memberof UserController
   * @returns {object} done function
   */
  static async facebookCallback(accessToken, refreshToken, profile, done) {
    try {
      const { _json: facebookData, name: { givenName } } = profile;
      const findCreateUser = await UserService.commonAuthUser(facebookData, 'Facebook', givenName);
      done(null, findCreateUser);
    } catch (error) {
      return done(null, false);
    }
  }

  /**
   * User can be able to sign up with Google
   * @static
   * @param {object} accessToken Google access token
   * @param {object} refreshToken should be token
   * @param {object} profile profile data
   * @memberof UserController
   * @returns {object} done function
   */

  static async googleCallback(accessToken, refreshToken, profile, done) {
    try {
      const { _json: googleData } = profile;
      const { name } = googleData;
      const findCreateUser = await UserService.commonAuthUser(googleData, 'Google', name);
      done(null, findCreateUser);
    } catch (error) {
      return done(null, false);
    }
  }

  /**
   * User can be able to sign up with Twitter
   * @static
   * @param {object} accessToken Twitter access token
   * @param {object} refreshToken should be token
   * @param {object} profile profile data
   * @memberof UserController
   * @returns {object} done function
   */

  static async twitterCallback(accessToken, refreshToken, profile, done) {
    try {
      const { _json: tweeterData } = profile;
      const { name } = tweeterData;
      const findCreateUser = await UserService.commonAuthUser(tweeterData, 'Twitter', name);
      done(null, findCreateUser);
    } catch (error) {
      return done(null, false);
    }
  }

  /**
   * User can be able to sign up with Github
   * @static
   * @param {object} accessToken Github access token
   * @param {object} refreshToken should be token
   * @param {object} profile profile data
   * @memberof UserController
   * @returns {object} done function
   */

  static async githubCallback(accessToken, refreshToken, profile, done) {
    try {
      const { _json: githubData, emails } = profile;
      const addEmail = emails[0].value;
      githubData.email = addEmail;
      const name = githubData.login;
      const findCreateUser = await UserService.commonAuthUser(githubData, 'Github', name);
      done(null, findCreateUser);
    } catch (error) {
      return done(null, false);
    }
  }

  /**
   * User should be redirected to the dashboard when login is successful
   * @static
   * @param {object} req request
   * @param {object} res response
   * @memberof UserController
   * @returns {object} redirect user
   */

  static async socialAuthRedirect(req, res) {
    const { DASHBOARD_REDIRECTION } = config;
    const { token } = req.user;
    const socialInfo = JSON.stringify({ token });
    return res.redirect(`${DASHBOARD_REDIRECTION}?info=${socialInfo}`);
  }
}

export default UserController;
