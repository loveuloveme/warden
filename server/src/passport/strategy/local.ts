import { Strategy } from 'passport-local';
import { source } from '../../database/source';
import { User } from '../../database/models/User';

const local = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) => {
        try {
            const userRepository = await source.getRepository(User);

            const user = await userRepository.findOne({
                where: [
                    { email }
                ]
            });

            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }

            if (await user.validPassword(password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid password' });
            }

        } catch (error) {
            return done(error, null);
        }
    });

export default local;