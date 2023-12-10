import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISub, IUser } from '../api/types';
import { IFileType } from '../api/fsApi';

interface IUserState {
    user: IUser | null;
    subs: ISub[] | null;
}

const initialState: IUserState = {
    user: null,
    subs: null
};

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setSubs: (state, action: PayloadAction<ISub[]>) => {
            state.subs = action.payload;
        },
    }
});

export default userSlice.reducer;

export const { logout, setUser, setSubs } = userSlice.actions;
