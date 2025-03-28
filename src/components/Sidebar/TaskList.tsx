import { RootState } from '@/features/store';
import { SquarePlus } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

const TaskList = () => {
    const { tasks, loading, selectedProjectId } = useSelector(
        (state: RootState) => state.tasks,
    );

    const user = useSelector((state: RootState) => state.auth.user);

    console.log(tasks);

    return (
        <section className="border-t border-t-gray-200 mt-5 pb-6">
            <div className="flex items-center justify-between p-3">
                <h3 className="uppercase text-gray-400">TASKS</h3>
                <SquarePlus className="w-5 h-5 text-blue-500 cursor-pointer" />
            </div>

            {user && !selectedProjectId && (
                <p className="p-3 text-gray-400 text-sm">
                    Chọn một dự án để xem tasks.
                </p>
            )}

            {/* Task-list */}
            <div className="max-h-40 overflow-y-auto">
                {user ? (
                    <>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul className="flex flex-col">
                                {tasks.map((task) => (
                                    <li
                                        key={task.id}
                                        className="py-2 px-3 text-gray-600 text-sm"
                                    >
                                        <p>{task.title}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <p className="text-gray-400 text-sm p-3">
                        Vui lòng đăng nhập
                    </p>
                )}
            </div>
        </section>
    );
};

export default TaskList;
