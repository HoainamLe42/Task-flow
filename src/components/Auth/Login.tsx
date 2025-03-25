import React, { useState } from 'react';
import PopUp from '../Share/PopUp';
import InputCustom from './InputCustom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/features/store';
import { login } from '@/features/auth/authSlice';
import { User, UserCreateAccount, UserLogin } from '@/types/auth';
import { API_URL } from '@/lib/api';
import Button from '../Share/Button';
import { UserRole } from '@/types/userRole';
import { Facebook, Twitter } from 'lucide-react';

const Login: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    onClose,
}) => {
    const [formLogin, setFormLogin] = useState<UserLogin>({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<Partial<UserLogin>>({});
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();

    // Get value Input
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormLogin((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Validate;
    const validateLogin = (): boolean => {
        const newErrors: Partial<UserLogin> = {};

        if (!formLogin.email || !formLogin.email.trim()) {
            newErrors.email = 'Email không được để trống.';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formLogin.email)
        ) {
            newErrors.email = 'Email không hợp lệ.';
        }

        if (!formLogin.password || !formLogin.password.trim()) {
            newErrors.password = 'Mật khẩu không được để trống.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateLogin()) {
            try {
                const response = await fetch(`${API_URL}/users`);
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu người dùng');
                }
                const users: User[] = await response.json();

                const foundUser: User | undefined = users.find(
                    (user) =>
                        user.email === formLogin.email.toLowerCase() &&
                        user.password === formLogin.password,
                );

                if (foundUser) {
                    setMessage('Đăng nhập thành công.');
                    alert(`Hello ${foundUser.username}`);
                    dispatch(login(foundUser));
                    setFormLogin({ email: '', password: '' });
                    onClose();
                    console.log('Login-userID: ', foundUser);
                } else {
                    setMessage('Mật khẩu hoặc email không đúng.');
                }
            } catch {
                console.log(errors);
                setMessage('Lỗi khi đăng nhập. Vui lòng thử lại.');
            }
        }
    };

    // Create an account logic
    const [formCreateAccount, setFormCreateAccount] =
        useState<UserCreateAccount>({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

    const [messageCreateAccount, setMessageCreateAccount] =
        useState<string>('');
    const [errorsCreateAccount, setErrorsCreateAccount] = useState<
        Partial<UserCreateAccount>
    >({});

    const validateCreateAccount = (): boolean => {
        const newErrors: Partial<UserCreateAccount> = {};

        if (!formCreateAccount.email || !formCreateAccount.email.trim()) {
            newErrors.email = 'Email không được để trống.';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                formCreateAccount.email,
            )
        ) {
            newErrors.email = 'Email không hợp lệ.';
        }
        if (!formCreateAccount.username || !formCreateAccount.username.trim()) {
            newErrors.username = 'username không được để trống.';
        }
        if (!formCreateAccount.password || !formCreateAccount.password.trim()) {
            newErrors.password = 'Mật khẩu không được để trống.';
        } else if (
            formCreateAccount.password !== formCreateAccount.confirmPassword
        ) {
            newErrors.confirmPassword =
                'Mật khẩu và xác nhận mật khẩu không khớp.';
        }

        setErrorsCreateAccount(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Get value Input
    const handleChangeCreateAccount = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        setFormCreateAccount((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitCreateAccount = async (
        e: React.ChangeEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        console.log('Create an account: ', formCreateAccount);

        if (validateCreateAccount()) {
            try {
                // Kiểm tra sự trùng lập
                const response = await fetch(`${API_URL}/users`);
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu người dùng');
                }
                const existingUsers: User[] = await response.json();
                const userExists = existingUsers.some(
                    (user) => user.email === formCreateAccount.email,
                );
                if (userExists) {
                    setMessageCreateAccount(
                        'Email đã tồn tại, vui lòng dùng email khác.',
                    );
                    return;
                }

                // Create an account with ID is type string
                const generateId = () => String(Date.now());

                const newUser: UserCreateAccount = {
                    id: generateId(),
                    username: formCreateAccount.username,
                    email: formCreateAccount.email.toLowerCase(),
                    password: formCreateAccount.password,
                    avatar: null,
                    status: 'active',
                    role: UserRole.User,
                };

                // Thêm tài khoản mới
                const createResponse = await fetch(`${API_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });

                if (createResponse.ok) {
                    setMessageCreateAccount('Đăng ký tài khoản thành công.');
                    setFormCreateAccount({
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                    onClose();
                    // Test
                    // const jsonString = JSON.stringify(
                    //     formCreateAccount,
                    //     null,
                    //     2,
                    // );
                    // alert(jsonString);
                }
            } catch (error) {
                console.error(error);
                setMessageCreateAccount('Lỗi tạo tài khoản, vui lòng thử lại');
            }
        }
    };

    return (
        <PopUp isOpen={isOpen} onClose={onClose}>
            <div className="w-[410px] overflow-hidden relative">
                <div
                    className={`flex w-[200%] transition-transform duration-300 ease-in-out ${
                        isLogin ? 'translate-x-0' : '-translate-x-[50%]'
                    }`}
                >
                    {/* Login form */}
                    <div className="w-[50%]">
                        <h3 className="text-3xl font-semibold text-gray-500 mb-8">
                            Login
                        </h3>

                        <div className="flex justify-between gap-4">
                            <p className="flex items-center justify-center gap-2 rounded-full cursor-pointer bg-blue-500 text-sm py-2 px-4 text-white w-full">
                                <Facebook size={20} />
                                With Facebook
                            </p>
                            <p className="flex items-center justify-center gap-2 rounded-full bg-sky-400 cursor-pointer text-sm py-2 px-4 text-white w-full">
                                <Twitter size={20} />
                                With Twitter
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <span className="grow ml-4 h-[2px] w-20 bg-gray-300"></span>

                            <p className="text-gray-400 my-5 relative">
                                Or Login with
                            </p>
                            <span className="grow mr-4 h-[2px] w-20 bg-gray-300"></span>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3 w-full"
                        >
                            <InputCustom
                                label="email"
                                value={formLogin.email}
                                onChange={handleChangeLogin}
                            />
                            {errors.email && (
                                <p className="text-left text-red-500 text-sm ml-2 mt-1">
                                    {errors.email}
                                </p>
                            )}
                            <InputCustom
                                label="password"
                                value={formLogin.password}
                                onChange={handleChangeLogin}
                            />
                            {errors.password && (
                                <p className="text-left text-red-500 text-sm ml-2 mt-1">
                                    {errors.password}
                                </p>
                            )}
                            {message && (
                                <p className="mt-4 text-center text-red-500">
                                    {message}
                                </p>
                            )}

                            <p className="ml-auto mb-4 text-blue-500 hover:underline cursor-pointer">
                                Forget password
                            </p>
                            <Button variant="default">Login</Button>
                            <p className="mt-3 mb-5">
                                Not a member?
                                <span
                                    onClick={() => setIsLogin(false)}
                                    className="ml-2 text-blue-500 hover:underline cursor-pointer"
                                >
                                    Create an account
                                </span>
                            </p>
                        </form>
                    </div>

                    {/* Create an account form */}
                    <div className="w-[50%] h-a">
                        <h3 className="text-3xl text-nowrap font-semibold text-gray-500 mb-8">
                            Create an Account
                        </h3>

                        <form
                            onSubmit={handleSubmitCreateAccount}
                            className="flex flex-col gap-3 w-full"
                        >
                            <InputCustom
                                label="username"
                                value={formCreateAccount.username}
                                onChange={handleChangeCreateAccount}
                            />
                            {errorsCreateAccount.username && (
                                <p className="text-left text-red-500 text-sm ml-2 mt-1">
                                    {errorsCreateAccount.username}
                                </p>
                            )}
                            <InputCustom
                                label="email"
                                value={formCreateAccount.email}
                                onChange={handleChangeCreateAccount}
                            />
                            {errorsCreateAccount.email && (
                                <p className="text-left text-red-500 text-sm ml-2 mt-1">
                                    {errorsCreateAccount.email}
                                </p>
                            )}
                            <InputCustom
                                label="password"
                                value={formCreateAccount.password}
                                onChange={handleChangeCreateAccount}
                            />
                            {errorsCreateAccount.password && (
                                <p className="text-left text-red-500 text-sm ml-2 mt-1">
                                    {errorsCreateAccount.password}
                                </p>
                            )}

                            <InputCustom
                                label="confirmPassword"
                                value={formCreateAccount.confirmPassword || ''}
                                onChange={handleChangeCreateAccount}
                            />
                            {errorsCreateAccount.confirmPassword && (
                                <p className="text-left text-red-500 text-sm ml-2 mt-1">
                                    {errorsCreateAccount.confirmPassword}
                                </p>
                            )}

                            {messageCreateAccount && (
                                <p className="mt-4 text-center text-red-500">
                                    {messageCreateAccount}
                                </p>
                            )}
                            <Button
                                type="submit"
                                variant="default"
                                className="mt-4"
                            >
                                Create Account
                            </Button>
                            <p className="mt-3">
                                Already a member?
                                <span
                                    onClick={() => setIsLogin(true)}
                                    className="ml-2 text-blue-500 hover:underline cursor-pointer"
                                >
                                    Login
                                </span>
                            </p>

                            <p></p>
                        </form>
                    </div>
                </div>
            </div>
        </PopUp>
    );
};

export default Login;
