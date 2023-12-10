import { DataSource } from 'typeorm';
import Subscription from './models/Subscription';
import { User } from './models/User';

export const source = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'sqluser',
    password: 'password',
    database: 'test',
    synchronize: true,
    logging: false,
    entities: [Subscription, User],
    subscribers: [],
    migrations: [],
})