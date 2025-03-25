'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

// import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '../components/Sidebar';
import { Provider } from 'react-redux';
import { store } from '../features/store';

// const metadata: Metadata = {
//     title: 'TaskFlow',
//     description: 'Ứng dụng quản lý dự án đơn giản',
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={plusJakartaSans.className}>
                <Provider store={store}>
                    <div className="flex h-screen">
                        <Sidebar />
                        <div>{children}</div>
                    </div>
                </Provider>
            </body>
        </html>
    );
}
