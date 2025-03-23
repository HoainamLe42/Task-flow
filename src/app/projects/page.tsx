'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const Projects = () => {
    const router = useRouter();
    const handleBtn = () => {
        router.push('/');
    };
    return <div onClick={handleBtn}>Projects</div>;
};

export default Projects;
