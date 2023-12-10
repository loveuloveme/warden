import { Router } from 'express';
import passport from '../passport';
import UserService from '../services/User';
import { CustomError } from '../utils/custom-error/CustomError';
import { User } from '../database/models/User';

// import { list, show, edit, destroy } from 'controllers/users';
// import { checkJwt } from 'middleware/checkJwt';
// import { checkRole } from 'middleware/checkRole';
// import { validatorEdit } from 'middleware/validation/users';

const router = Router();

router.post('/signin', passport.authenticate('local', { failureMessage: true }),
    function (req, res) {
        res.customSuccess(200, 'Loggined');
    }
);

router.post('/signup', async function (req, res, next) {
    const { email, password } = req.body;

    if (await UserService.getUser(email)) {
        return next(new CustomError(409, 'General', `Given email already exists.`, null));
    }

    const user = await UserService.addUser(email, password);

    req.login(user, (err) => {

    })

    res.customSuccess(200, 'User created.');
});

router.get('/me', async function (req, res, next) {
    if (!req.user) {
        return next(new CustomError(401, 'Unauthorized', `Unauthorized.`, null));
    }

    res.customSuccess(200, 'User fetched.', req.user);
});



//router.get('/:id/:hash', create);

// router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list);
// router.get('/:id', [checkJwt, checkRole(['ADMINISTRATOR'], true)], show);

// router.post('/:id', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorEdit], edit);
// router.delete('/:id', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;