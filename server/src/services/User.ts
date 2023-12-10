import { Repository } from "typeorm";
import { User } from "../database/models/User";
import { source } from "../database/source";


export default class UserService {
    private static getRepository(): Repository<User> {
        return source.getRepository(User);
    }

    public static async getUser(email: string): Promise<User> {
        const userRepository = this.getRepository();

        const user = await userRepository.findOne({
            where: [
                { email }
            ]
        });

        return user;
    }

    public static async addUser(email: string, password: string): Promise<User> {
        const userRepository = this.getRepository();

        const user = new User();
        user.email = email;
        user.password = password;

        userRepository.save(user);

        return user;
    }
}