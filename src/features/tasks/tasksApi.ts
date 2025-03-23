import { API_URL } from '@/lib/api';
import { Task } from '@/types/task';

export async function getTasks(projectId: number): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks?projectId=${projectId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    const data: Task[] = await response.json();
    return data;
}
