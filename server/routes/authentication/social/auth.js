import { Router } from 'express';
import passport from 'passport';
import '../../../middlewares/passport';
import UserController from '../../../controllers/UserController';
import UserService from '../../../services/UserService';
import config from '../../../../config/index';


const { FRONTENT_FAILURE_REDIRECTION } = config;
const router = Router();

router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(
  (id, done) => UserService.deserializeAuthUser(id, done),
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${FRONTENT_FAILURE_REDIRECTION}` }),
  UserController.socialAuthRedirect,
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: { scope: ['profile', 'email'] } }),
  UserController.socialAuthRedirect,
);

router.get('/twitter', passport.authenticate('twitter'));
router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: `${FRONTENT_FAILURE_REDIRECTION}` }),
  UserController.socialAuthRedirect,
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: `${FRONTENT_FAILURE_REDIRECTION}` }),
  UserController.socialAuthRedirect,
);

export default router;
