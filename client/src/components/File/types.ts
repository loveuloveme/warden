import { IFileType } from "../../redux/api/types";

export interface IFileProps {
    file: IFileType;
    subID?: string;
    useLink?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
}