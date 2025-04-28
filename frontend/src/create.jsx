import react, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (!task) {
            console.log("Task cannot be empty");
            return;
        }

        axios.post('http://localhost:3001/add', { task })
            .then(result => { location.reload() })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex items-center justify-center gap-5">
            <input
                type="text"
                placeholder="Enter something..."
                onChange={(e) => setTask(e.target.value)}
                className="border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button onClick={handleAdd}
                className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition"
            >
                Add
            </button>
        </div>
    );
}

export default Create;
