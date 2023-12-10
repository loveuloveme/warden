import { Container } from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import { useGetDirQuery } from '../../redux/api/fsApi';
import { FileType } from '../../contexts/Directory';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import FileList from '../../components/FileList/FileList';

const Home = () => {
    const { id } = useParams();
    const { currentData, isLoading, isSuccess } = useGetDirQuery({ id: id ?? '' }, { pollingInterval: 10000, refetchOnMountOrArgChange: true });
    const [files, setFiles] = useState<FileType | null>(null);

    useEffect(() => {
        if (isSuccess && currentData) {
            setFiles(currentData as FileType);
        }
    }, [currentData, isSuccess]);

    return (
        <>
            <Navbar />
            <Loader show={isLoading} />
            <Container
                maxW='container.lg'
                position='relative'
            >
                {files && <FileList files={files?.child} />}
            </Container>
        </>
    );
};

export default Home;