import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import user from './features/user.slice';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { fsApi } from './api/fsApi';
import { subsApi } from './api/subs';

export const store = configureStore({
    reducer: {
        user,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [fsApi.reducerPath]: fsApi.reducer,
        [subsApi.reducerPath]: subsApi.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware, fsApi.middleware, subsApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;