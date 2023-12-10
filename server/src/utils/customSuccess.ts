import { response, Response } from 'express';

declare global {
    namespace Express {
        export interface Response {
            customSuccess: Function;
        }
    }
}

response.customSuccess = function (httpStatusCode: number, message: string, data: any = null): Response {
    return this.status(httpStatusCode).json({ message, data });
};
