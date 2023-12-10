import { Navigate, Outlet } from 'react-router-dom';
import { userApi } from '../../redux/api/userApi';
import { GuardType, IGuardProps } from './types';

const Guard = (props: IGuardProps) => {
    const { type = GuardType.ANY } = props;

    const user = userApi.endpoints.getMe.useQueryState(null, {
        selectFromResult: ({ data }) => data,
    });

    if (user) {
        if (type === GuardType.UNAUTH_ONLY) return <Navigate to='/' replace />;
    } else {
        if (type === GuardType.AUTH_ONLY) return <Navigate to='/signin' replace />;
    }

    return <Outlet />;
};

export default Guard;