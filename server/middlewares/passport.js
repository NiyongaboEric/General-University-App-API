// import passport from 'passport';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as TwitterStrategy } from 'passport-twitter';
// import { Strategy as GithubStrategy } from 'passport-github';
// import config from '../../config/index';
// import UserControllers from '../controllers/UserController';


// const {
//   FACEBOOK_CLIENT_ID,
//   FACEBOOK_CLIENT_SECRET,
//   FACEBOOK_CALLBACK_URL,
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_CALLBACK_URL,
//   TWITTER_CLIENT_ID,
//   TWITTER_SECRET_KEY,
//   TWITTER_CALLBACK_URL,
//   USER_PROFILE_URL,
//   GITHUB_CLIENT_ID,
//   GITHUB_CLIENT_SECRET,
//   GITHUB_CALLBACK_URL,
// } = config;


// const facebookOptions = {
//   clientID: FACEBOOK_CLIENT_ID,
//   clientSecret: FACEBOOK_CLIENT_SECRET,
//   callbackURL: FACEBOOK_CALLBACK_URL,
//   profileFields: ['id', 'email', 'first_name', 'last_name', 'middle_name'],
// };

// const googleOptions = {
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: GOOGLE_CALLBACK_URL,
// };

// const twitterOptions = {
//   consumerKey: TWITTER_CLIENT_ID,
//   consumerSecret: TWITTER_SECRET_KEY,
//   userProfileURL: USER_PROFILE_URL,
//   callbackURL: TWITTER_CALLBACK_URL,
// };

// const githubOptions = {
//   clientID: GITHUB_CLIENT_ID,
//   clientSecret: GITHUB_CLIENT_SECRET,
//   callbackURL: GITHUB_CALLBACK_URL,
//   scope: 'user:email',
// };


// passport.use(new FacebookStrategy(
//   facebookOptions,
//   UserControllers.facebookCallback,
// ));

// passport.use(new GoogleStrategy(
//   googleOptions,
//   UserControllers.googleCallback,
// ));

// passport.use(new TwitterStrategy(
//   twitterOptions,
//   UserControllers.twitterCallback,
// ));

// passport.use(new GithubStrategy(
//   githubOptions,
//   UserControllers.githubCallback,
// ));

// export default passport;
