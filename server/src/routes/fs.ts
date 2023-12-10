import { Router } from 'express';
import { list } from '../controllers/fs/list';

const router = Router();

router.get('/', list);
router.get('/:unitID', list);

export default router;