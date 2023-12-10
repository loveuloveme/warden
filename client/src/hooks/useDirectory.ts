import { useContext } from "react";
import { IDirectoryContext, DirectoryContext } from "../contexts/Directory";

export const useDirectory = (): IDirectoryContext => {
    return useContext(DirectoryContext) as IDirectoryContext;
};