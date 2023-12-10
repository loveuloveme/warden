/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAuthInput {
    email: string;
    password: string;
}

export interface IGenericResponse {
    data: string;
    message: string;
}

export interface IUser {
    id: number;
    email: string;
}

export interface ISubscription{
    id: string;
    fileId: string;
    fileHash: string;
    anyUpdate: boolean;
    file: IFileType | null;
    filePath: string;
}

export interface IFileType {
    hash: string,
    id: string
    path: string
    child: IFileType[];
    isDir: boolean;
    name: string;
}

export interface SerializedError {
    errorType: string;
    errorMessage: string;
    errors: string[] | null;
    errorRaw: any;
    errorsValidation: { [key: string]: string } | null;
    stack?: string;
}