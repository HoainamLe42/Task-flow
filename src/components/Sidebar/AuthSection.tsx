import { RootState } from '@/features/store';
import { LogIn, Settings } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from '../Auth/Login';

const AuthSection = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <section
                className={`flex items-center justify-center gap-2 border min-h-[66px] border-gray-300 rounded-lg p-2`}
            >
                {user ? (
                    <>
                        <div className="h-12 w-12">
                            <img
                                src="./logo.png"
                                alt="avatar"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <p className="flex flex-col justify-center text-sm text-gray-400 font-medium">
                            <span className="text-gray-600">Muhammed Ali</span>
                            <span>Free Account</span>
                        </p>

                        <span className="ml-auto p-3 text-gray-600 cursor-pointer">
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
