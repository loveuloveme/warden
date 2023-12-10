import { Router } from 'express';
import fs from './fs';
import auth from './auth';
import subs from './subscription';


const router = Router();

router.use('/fs', fs);
router.use('/auth', auth);
router.use('/subs', subs);

export default router;