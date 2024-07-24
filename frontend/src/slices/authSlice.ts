import {createSlice} from "@reduxjs/toolkit";

interface UserInfo {
    _id: string;
    name: string;
    email: string;

}

interface InitialState {
    userInfo: UserInfo | null;
}

const getUserInfoFromStorage = (): UserInfo | null => {
    const userInfoString = localStorage.getItem('userInfo');
    if (!userInfoString) return null;

    try {
        return JSON.parse(userInfoString);
    } catch (error) {
        console.error('Error parsing userInfo from localStorage:', error);
        return null;
    }
};

const initialState: InitialState = {
    userInfo: getUserInfoFromStorage(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;