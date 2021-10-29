import { Router } from 'express';
import socialAuth from './authentication/social/auth';
import { notFound } from '../middlewares/handlingRequest';

const router = Router();

router.use('/auth', socialAuth);
router.use(notFound);

export default router;
