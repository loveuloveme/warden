import { VStack } from '@chakra-ui/react';
import File from '../File/';
import { IFileListProps } from './types';
import { IFileType } from '../../redux/api/types';

const FileList = (props: IFileListProps) => {
    const { files } = props;

    return (
        <VStack
            my='5'
            align='stretch'
        >
            {files && files.map((file: IFileType) => {
                return <File file={file} />;
            })}
        </VStack>
    );
};

export default FileList;