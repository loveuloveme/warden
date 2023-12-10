import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../utils/custom-error/CustomError';
import watcher from '../../watcher';
import { source } from '../../database/source';
import Subscription from '../../database/models/Subscription';
import { User } from '../../database/models/User';

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subsRepository = source.getRepository(Subscription);
        const subId = parseInt(req.body.id as string);

        const sub = await subsRepository.findOne({
            where: [
                { id: subId }
            ]
        });

        if (!sub) {
            return next(new CustomError(404, 'General', `Given subscription doesn't exist.`, null));
        }

        res.customSuccess(200, 'Subscription removed.', await subsRepository.remove(sub));
    } catch (err) {
        return next(new CustomError(400, 'Raw', `Error`, null, err));
    }
};