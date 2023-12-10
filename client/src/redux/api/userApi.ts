import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from './types';
import { setUser } from '../features/user.slice';
import { BASE_URL } from './constants';
import { subsApi } from './subs';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth`,
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getMe: builder.query<IUser, null>({
            query() {
                return {
                    url: 'me',
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: IUser }) => result.data,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const {
    useGetMeQuery
} = userApi;