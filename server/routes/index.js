import { Router } from 'express';
import index from './university/index';
import { notFound } from '../middlewares/handlingRequest';

const router = Router();

router.use('/university', index);
router.use(notFound);

export default router;
