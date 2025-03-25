import { User } from '@/types/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Kiểm tra xem có đang ở client-side không
const isClient = typeof window !== 'undefined';
console.log(isClient);

const getUserFromLocalStorage = () => {
    if (isClient) {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
};

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: isClient ? getUserFromLocalStorage() : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            if (isClient) {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
        },
        logout: (state) => {
            state.user = null;
            if (isClient) {
                localStorage.removeItem('user');
            }
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
