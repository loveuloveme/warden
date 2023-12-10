import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenericResponse, ISubscription } from './types';
import { setSubs } from '../features/user.slice';
import { BASE_URL } from './constants';

export const subsApi = createApi({
    reducerPath: 'subsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/subs`,
    }),
    tagTypes: ['Subscriptions'],
    endpoints: (builder) => ({
        getSubs: builder.query<ISubscription[], null>({
            query() {
                return {
                    url: '/',
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: ISubscription[] }) => result.data,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setSubs(data));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Subscriptions']
        }),
        remove: builder.mutation<IGenericResponse, { id: string }>({
            query(data) {
                return {
                    url: '/',
                    method: 'DELETE',
                    body: data,
                    credentials: 'include'
                };
            },
            invalidatesTags: ['Subscriptions']
        }),
        create: builder.mutation<IGenericResponse, { id: string, hash: string, anyUpdate: boolean }>({
            query(data) {
                return {
                    url: '/',
                    method: 'POST',
                    body: data,
                    credentials: 'include'
                };
            },
            invalidatesTags: ['Subscriptions']
        }),
    }),
});

export const {
    useGetSubsQuery,
    useRemoveMutation,
    useCreateMutation
} = subsApi;