import dotenv from 'dotenv';
dotenv.config();

import './utils/customSuccess';
import { errorHandler } from './middleware/errorHandler';
import session from 'express-session';

import passport from './passport';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import { source } from './database/source';
import watcher from './watcher';
import bodyParser from 'body-parser';
import { protectedRoute } from './middleware/protectedRoute';
export const app = express();

app.use(cors({
    credentials: true,
    origin: true
}));


app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000000000 },
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', protectedRoute('/auth'), routes);
app.use(errorHandler);
const port = process.env.PORT || 4000;

async function main() {
    await source.initialize();

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

watcher.on('ready', () => {
    main();
});
