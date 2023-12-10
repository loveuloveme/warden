import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthInput, IGenericResponse } from './types';
import { userApi } from './userApi';
import { BASE_URL } from './constants';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth`,
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation<IGenericResponse, IAuthInput>({
            query(data) {
                return {
                    url: '/signup',
                    method: 'POST',
                    body: data,
                    credentials: 'include'
                };
            },
        }),
        signIn: builder.mutation<IGenericResponse, IAuthInput>({
            query(data) {
                return {
                    url: '/signin',
                    method: 'POST',
                    body: data,
                    credentials: 'include'
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) { /* empty */ }
            },
        })
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation
} = authApi;