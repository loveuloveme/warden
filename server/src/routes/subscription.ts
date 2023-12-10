import { Router } from 'express';
import { list } from '../controllers/subscriptions/list';
import { create } from '../controllers/subscriptions/create';
import { remove } from '../controllers/subscriptions/remove';
// import { list, show, edit, destroy } from 'controllers/users';
// import { checkJwt } from 'middleware/checkJwt';
// import { checkRole } from 'middleware/checkRole';
// import { validatorEdit } from 'middleware/validation/users';

const router = Router();

router.get('/', list);
router.post('/', create);
router.delete('/', remove);

// router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list);
// router.get('/:id', [checkJwt, checkRole(['ADMINISTRATOR'], true)], show);

// router.post('/:id', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorEdit], edit);
// router.delete('/:id', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;