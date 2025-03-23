import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '../components/Sidebar';
import { store } from '../features/store';
import { Provider } from 'react-redux';

export const metadata: Metadata = {
    title: 'TaskFlow',
    description: 'Ứng dụng quản lý dự án đơn giản',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {/* <Provider store={store}> */}
                <div className="flex h-screen">
                    <Sidebar />
                    <div>{children}</div>
                </div>
                {/* </Provider> */}
            </body>
        </html>
    );
}
