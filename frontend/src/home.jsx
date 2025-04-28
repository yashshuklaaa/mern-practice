import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './create';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    // Fetch tasks from backend
    const fetchTasks = () => {
        axios.get('http://localhost:3001/get')
            .then(response => setTasks(response.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Mark a task as done
    const handleDone = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)
            .then(() => fetchTasks())
            .catch(err => console.log(err));
    };

    // Delete a task
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => fetchTasks())
            .catch(err => console.log(err));
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>

            {/* Create or Edit Task */}
            <Create editingTask={editingTask} setEditingTask={setEditingTask} refreshData={fetchTasks} />

            {/* Task List */}
            <div className="mt-8 flex flex-col gap-4">
                {tasks.map((task) => (
                    <div key={task._id} className="flex items-center justify-between bg-gray-100 p-4 rounded shadow gap-10">
                        <div className={`flex-1 ${task.done ? "line-through text-gray-400" : ""}`}>
                            {task.task}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleDone(task._id)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Done
                            </button>
                            <button
                                onClick={() => setEditingTask(task)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
