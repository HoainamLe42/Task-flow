import { Project } from '@/types/project';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProject, getProjects } from './projectsApi';

interface ProjectsState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectsState = {
    projects: [],
    loading: false,
    error: null,
};

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        const projects = await getProjects();
        return projects;
    },
);

export const addNewProject = createAsyncThunk(
    'project/addNewProject',
    async (name: string) => {
        const addNewProject = await createProject(name);
        return addNewProject;
    },
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Failed to fetch projects';
            });
        // .addCase(fetchProjects.fulfilled, (state, action) => {
        //     state.projects = action.payload;
        // });
    },
});

export default projectsSlice.reducer;
