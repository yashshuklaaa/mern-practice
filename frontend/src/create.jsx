import React, { useState } from 'react';
import axios from 'axios';

function Create({ editingTask, setEditingTask, refreshData }) {
    const [task, setTask] = useState("");

    // If you are editing, pre-fill the input
    React.useEffect(() => {
        if (editingTask) {
            setTask(editingTask.task);
        }
    }, [editingTask]);

    const handleAddOrUpdate = () => {
        if (!task) {
            console.log("Task cannot be empty");
            return;
        }

        if (editingTask) {
            // If editing, update the task
            axios.put(`http://localhost:3001/edit/${editingTask._id}`, { task })
                .then(result => {
                    console.log("Task updated");
                    setEditingTask(null);
                    setTask("");
                    refreshData();
                })
                .catch(err => console.log(err));
        } else {
            // If creating new task
            axios.post('http://localhost:3001/add', { task })
                .then(result => {
                    console.log("Task added");
                    setTask("");
                    refreshData();
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="flex items-center justify-center gap-5">
            <input
                type="text"
                placeholder="Enter something..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button onClick={handleAddOrUpdate}
                className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition"
            >
                {editingTask ? "Update" : "Add"}
            </button>
        </div>
    );
}

export default Create;
