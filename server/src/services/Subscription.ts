import { Repository } from "typeorm";
import { source } from "../database/source";
import Subscription from "../database/models/Subscription";


export default class SubscriptionService {
    private static getRepository(): Repository<Subscription> {
        return source.getRepository(Subscription);
    }

    public static async getSubscriptions(fileId: string): Promise<Subscription[]> {
        const subRepository = this.getRepository();

        const sub = await subRepository.find({
            where: [
                { fileId }
            ]
        });

        return sub;
    }

    public static async removeSubscription(sub: Subscription): Promise<Subscription> {
        const subRepository = this.getRepository();

        return await subRepository.remove(sub);
    }
}