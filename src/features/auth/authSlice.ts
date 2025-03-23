import { API_URL } from '@/lib/api';
import { User, UserLogin } from '@/types/auth';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (
        credentials: { email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const response = await fetch(
                `${API_URL}/users?email=${credentials.email}`,
            );

            if (!response.ok) {
                throw new Error('Email chưa được đăng ký');
            }
            const user: UserLogin[] = await response.json();

            if (!user[0].email.trim()) {
                return rejectWithValue('Email không được để trống.');
            }

            if (
                user.length === 0 ||
                user[0].password !== credentials.password
            ) {
                return rejectWithValue('Email hoặc mật khẩu không đúng!');
            }

            // Lưu trữ thông tin người dùng và token
            localStorage.setItem('user', JSON.stringify(user[0]));
            console.log(`Đăng nhập thành công`);
            return user[0];
        } catch (error) {
            return rejectWithValue('Lỗi kết nối!');
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
