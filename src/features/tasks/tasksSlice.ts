import { Task } from '@/types/task';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasks } from './tasksApi';

interface TasksState {
    tasks: Task[];
    selectedProjectId: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    selectedProjectId: null,
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (projectId: string) => {
        const tasks = await getTasks(projectId);
        return tasks;
    },
);

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        selectedProject: (state, action: PayloadAction<number>) => {
            state.selectedProjectId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.loading = false;
                state.error = 'Không thể tải danh sách tasks';
            });
    },
});
export const { selectedProject } = tasksSlice.actions;
export default tasksSlice.reducer;
