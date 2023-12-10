import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error/CustomError';

export const protectedRoute = (...excludeRoutes: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if(excludeRoutes.some(route => req.url.startsWith(route))){
            return next();
        }

        if (!req.user) {
            return next(new CustomError(401, 'Unauthorized', 'Unauthorized.', null));
        }

        return next();
    };
};