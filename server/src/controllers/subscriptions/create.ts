import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../utils/custom-error/CustomError';
import watcher from '../../watcher';
import { source } from '../../database/source';
import Subscription from '../../database/models/Subscription';
import { User } from '../../database/models/User';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const createSub = (id: string, hash: string, path: string, anyUpdate: boolean) => {
        const sub = new Subscription();
        sub.user = req.user as User;
        sub.fileId = id;
        sub.anyUpdate = anyUpdate;
        sub.fileHash = hash;
        sub.filePath = path;

        return sub;
    }

    try {
        const subsRepository = source.getRepository(Subscription);

        const fileHash = req.body.hash as string;
        const fileId = req.body.id as string;
        const anyUpdate = req.body.anyUpdate as boolean;

        const unit = watcher.get(fileId);

        if (!fileHash || !fileId) {
            return next(new CustomError(404, 'General', `Id or hash not provided.`, null));
        }

        if (!unit) {
            return next(new CustomError(404, 'General', `Given fileId: ${fileId} do not exists.`, null));
        }

        if (fileHash && unit.hash !== fileHash) {
            return next(new CustomError(404, 'General', `Given fileId: ${fileId} already has another hash.`, null));
        }

        if (await subsRepository.findOne({
            where: [
                { user: req.user, fileId, fileHash, anyUpdate }
            ]
        })) {
            return next(new CustomError(404, 'General', `Given subscription already exist.`, null));
        }


        subsRepository.save(createSub(fileId, fileHash, unit.path, anyUpdate));

        res.customSuccess(200, 'Subscription created.');
    } catch (err) {
        return next(new CustomError(400, 'Raw', `Error`, null, err));
    }
};