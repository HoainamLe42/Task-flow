import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projects/projectsSlice';
import tasksReducer from './tasks/tasksSlice';

export const store = configureStore({
    reducer: { projects: projectsReducer, tasks: tasksReducer },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
