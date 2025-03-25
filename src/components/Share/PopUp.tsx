import { SquareX } from 'lucide-react';
import React from 'react';

interface PopUpProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[198] flex items-center justify-center">
            {/* Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 z-[199] bg-black/50"
            ></div>
            <div className="relative z-[200] min-w-[420px] rounded-md shadow-lg pt-10 py-3 px-4 text-center bg-white">
                {children}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 cursor-pointer"
                >
                    <SquareX />
                </button>
            </div>
        </div>
    );
};

export default PopUp;
