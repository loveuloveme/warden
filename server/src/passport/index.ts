import passport, { use } from 'passport';
import local from './strategy/local';
import UserService from '../services/User';
import { User } from '../database/models/User';

export enum AuthenticationType {
    local
}

declare global {
    namespace Express {
        interface User {
            id: number;
            email: string;
        }
    }
}

passport.serializeUser((user: User, done) => {
    done(null, user);
});

passport.deserializeUser(async (_user: User, done) => {
    try {
        const user = await UserService.getUser(_user.email);

        if (user) {
            done(null, { id: user.id, email: user.email });
        } else {
            throw new Error('User does not exist');
        }
    } catch (err) {
        done(err, null);
    }
});

passport.use(local);

export default passport;