import { UserRole } from './userRole';

export type UserLogin = {
    email: string;
    password: string;
};

export type UserCreateAccount = {
    id?: string;
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    avatar?: null;
    role?: UserRole.User;
    status?: 'active';
};

export type User = {
    id: string;
    email: string;
    password: string;
    username: string;
    phone?: string;
    avatar: string | null;
    role: UserRole.User | UserRole.Admin | UserRole.Editor;
    status: 'active' | 'banned';
};
