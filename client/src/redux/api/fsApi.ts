import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './constants';
import { IFileType } from './types';

export const fsApi = createApi({
    reducerPath: 'fsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/fs`,
    }),
    endpoints: (builder) => ({
        getDir: builder.query<IFileType, { id: string }>({
            query(args) {
                const { id } = args;

                return {
                    url: '/' + id,
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: IFileType }) => result.data,
        }),
    }),
});

export const {
    useGetDirQuery
} = fsApi;