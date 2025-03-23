export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
};

export type UserLogin = {
    email: string;
    password: string;
};
