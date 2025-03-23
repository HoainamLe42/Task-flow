'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarItems } from '@/data/sidebarItems';
import ProjectList from './Sidebar/ProjectList';
import TaskList from './Sidebar/TaskList';
import { Metadata } from 'next';
import AuthSection from './Sidebar/AuthSection';

// Images + Icons

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Ứng dụng quản lý dự án đơn giản',
};

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="flex flex-col justify-between w-[20%] py-6 px-5 border-r border-gray-300 overflow-hidden">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 text-2xl">
                <img
                    src="./logo.png"
                    alt="Logo"
                    loading="lazy"
                    className="h-[36px] w-[36px] object-cover"
                />
                <span>TaskFlow</span>
            </div>
            {/* Nav */}
            <nav className="mt-2">
                <ul className="flex flex-col">
                    {sidebarItems.map((nav) => (
                        <li key={nav.id}>
                            <Link
                                href={nav.path}
                                className={`flex gap-2 p-3 ${
                                    pathname === nav.path
                                        ? 'bg-sky-500 rounded-xl text-white'
                                        : 'text-gray-600'
                                }`}
                            >
                                <nav.icon className="w-6 h-6 object-cover" />
                                <p className="font-medium ">{nav.label}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Projects */}
            <ProjectList />
            {/* Tasks */}
            <TaskList />
            {/* Login / Logout */}
            <AuthSection />
        </aside>
    );
};

export default Sidebar;
