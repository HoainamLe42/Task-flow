import React, { useState } from 'react';
import PopUp from '../Share/PopUp';
import InputCustom from './InputCustom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/features/store';
import { loginUser } from '@/features/auth/authSlice';

const Login: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    onClose,
}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch<AppDispatch>();
    const { error } = useSelector((state: RootState) => state.auth);

    // Get value Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(loginUser(formData));
        onClose();
        console.log(formData);
    };

    return (
        <PopUp isOpen={isOpen} onClose={onClose}>
            <div>
                <h3 className="text-3xl font-semibold text-gray-500 mb-8">
                    Login
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 w-full"
                >
                    <InputCustom
                        label="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputCustom
                        label="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {error && <p>{error}</p>}
                    <button>sub</button>
                </form>
            </div>
        </PopUp>
    );
};

export default Login;
