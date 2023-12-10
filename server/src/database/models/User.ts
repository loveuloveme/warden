import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, Unique, OneToMany } from 'typeorm';
import Subscription from './Subscription';
let bcrypt = require('bcryptjs');

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => Subscription, (sub) => sub.user)
    subscriptions: Subscription[];

    @Column()
    password: string;

    @BeforeInsert()
    hashPassword() {
        const saltRounds = 10;
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }

    async validPassword(passwordInput: string) {
        return await bcrypt.compare(passwordInput, this.password);
    }
}