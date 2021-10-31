import { Router } from 'express';

import { createUniversity } from '../../utils/validation/university';

const router = Router();
router.post(
  '/',
  createUniversity,
  (req, res) => {
	  console.log('====> Added new school');
  },
);

export default router;
