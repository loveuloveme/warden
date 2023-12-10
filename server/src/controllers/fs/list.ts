import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../utils/custom-error/CustomError';
import watcher from '../../watcher';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const unitID = req.params.unitID ?? watcher.getRootId();

    try {
        let file = watcher.get(unitID);

        if (!file) {
            return next(new CustomError(404, 'General', `No dir with id: ${unitID}`, null));
        }

        if (!file.dir) {
            return next(new CustomError(404, 'General', `Unit with id ${unitID} is not a dir`, null));
        }

        res.customSuccess(200, 'Directory\'s structure.', watcher.toResponse(file));
    } catch (err) {
        return next(new CustomError(400, 'Raw', `Error`, null, err));
    }
};