import { fetchProjects } from '@/features/projects/projectsSlice';
import { AppDispatch, RootState } from '@/features/store';
import { SquarePlus } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import { fetchTasks, selectedProject } from '@/features/tasks/tasksSlice';

const ProjectList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, loading, error } = useSelector(
        (state: RootState) => state.projects,
    );
    const { selectedProjectId } = useSelector(
        (state: RootState) => state.tasks,
    );

    useEffect(() => {
        if (projects.length === 0) dispatch(fetchProjects());
    }, [dispatch, projects.length]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) return <p>Error: {error}</p>;

    const handleProjectClick = (projectId: number) => {
        dispatch(selectedProject(projectId));
        dispatch(fetchTasks(projectId));
    };

    return (
        <section className="border-t border-t-gray-200 mt-8">
            <div className="flex items-center justify-between p-3">
                <h3 className="uppercase text-gray-400">PROJECTS</h3>
                <SquarePlus className="w-5 h-5 text-blue-500 cursor-pointer" />
            </div>

            {/* Project-list */}
            <ul className="flex flex-col">
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={`p-3 text-gray-600 cursor-pointer ${
                            selectedProjectId === project.id
                                ? 'bg-sky-500 rounded-xl text-white'
                                : 'text-gray-600'
                        }`}
                        onClick={() => handleProjectClick(project.id)}
                    >
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ProjectList;
