import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../utils/custom-error/CustomError';
import { source } from '../../database/source';
import Subscription from '../../database/models/Subscription';
import watcher from '../../watcher';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const subsRepository = await source.getRepository(Subscription);

    try {
        const subs = await subsRepository.find({
            where: [
                { user: req.user }
            ],
            order: {
                created_at: 'DESC'
            }
        });

        const fileSubs = subs.map(sub => {
            const file = watcher.get(sub.fileId);

            return {
                ...sub,
                file: file ? watcher.toResponse(watcher.get(sub.fileId)) : null,
            }
        });

        res.customSuccess(200, 'Email\'s subscriptions', fileSubs);
    } catch (err) {
        return next(new CustomError(400, 'Raw', `Error`, null, err));
    }
};