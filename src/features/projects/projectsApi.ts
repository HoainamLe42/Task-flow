import { API_URL } from '@/lib/api';
import { Project } from '../../types/project';

export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    const data: Project[] = await response.json();
    return data;
}

export async function createProject(name: string) {
    const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (!response.ok) {
        throw new Error('Failed to create project');
    }
    return response.json();
}
