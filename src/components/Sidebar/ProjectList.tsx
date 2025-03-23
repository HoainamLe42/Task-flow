import { SquarePlus } from 'lucide-react';
import React, { useEffect } from 'react';

const ProjectList = () => {
    // const projects = useSelector((state: RootState) => state.projects.projects);
    // const loading = useSelector((state: RootState) => state.projects.loading);
    // const error = useSelector((state: RootState) => state.projects.error);
    // const dispatch = useDispatch<AppDispatch>();

    // useEffect(() => {
    //     dispatch(fetchProjects());
    // }, [dispatch]);

    // if (loading) {
    //     return <LoadingSpinner />;
    // }

    // if (error) return <p>Error: {error}</p>;

    return (
        <section className="border-t border-t-gray-200 mt-8">
            <div className="flex items-center justify-between p-3">
                <h3 className="uppercase text-gray-400">PROJECTS</h3>
                <SquarePlus className="w-5 h-5 text-blue-500 cursor-pointer" />
            </div>
        </section>
    );
};

export default ProjectList;
