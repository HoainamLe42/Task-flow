import { AppDispatch, RootState } from '@/features/store';
import { LogIn, Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Login from '../Auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { defaultAvatar } from '@/utils/defaultAvatar';
import Image from 'next/image';

const AuthSection = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const [isClient, setIsClient] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // Chỉ set client-side state sau khi component được mount (khi đã ở môi trường trình duyệt)
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <section
                className={`flex items-center justify-center gap-2 border min-h-[66px] border-gray-300 rounded-lg p-2`}
            >
                {isClient && user ? (
                    <>
                        <Image
                            src={user?.avatar ?? defaultAvatar}
                            alt="User Avatar"
                            height={48}
                            width={48}
                            className="h-full w-full object-cover"
                        />

                        <p className="flex flex-col justify-center text-sm text-gray-400 font-medium">
                            <span className="text-gray-600">Muhammed Ali</span>
                            <span>Free Account</span>
                        </p>

                        <span
                            onClick={() => dispatch(logout())}
                            className="ml-auto p-3 text-gray-600 cursor-pointer"
                        >
                            <Settings size={18} />
                        </span>
                    </>
                ) : (
                    <div
                        onClick={() => setIsLoginOpen(true)}
                        className="font-semibold text-gray-500 flex items-center gap-3 cursor-pointer"
                    >
                        Sign In
                        {/* Icons */}
                        <LogIn />
                    </div>
                )}
            </section>
            {/* PopUp Login */}
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
};

export default AuthSection;
