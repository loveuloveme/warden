import { useGetMeQuery } from '../../redux/api/userApi';
import Loader from '../Loader/Loader';
import { IAuthMiddlewareProps } from './types';

const AuthMiddleware = (props: IAuthMiddlewareProps) => {
    const { children } = props;

    const { isLoading, isFetching, isUninitialized } = useGetMeQuery(null, {
        skip: false,
        refetchOnMountOrArgChange: true,
    });


    const loading = isLoading || isFetching && !isUninitialized;

    if (loading) {
        return <Loader />;
    }

    return children;
};

export default AuthMiddleware;