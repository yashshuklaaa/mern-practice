import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios'
import Create from './create'
function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => { console.log(result.data); setTodos(result.data) })
            .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.get('http://localhost:3001/update/' + id)
            .then(result => { location.reload() })
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => { location.reload() })
            .catch(err => console.log(err))
    }
    return (
        <div className='flex items-center justify-center pt-20'>
            <div className='flex flex-col items-center gap-10'>
                <h1 className='font-bold text-red-500'>Todo List</h1>
                <Create />
                {
                    todos.length === 0 ? (
                        <div className='flex pl-16 items-center text-black'>
                            No uploadation
                        </div>)
                        :
                        todos.map((todo) => (
                            <div key={todo.id} className="flex items-center justify-between bg-yellow-300 text-red-600 p-3 rounded-md shadow-md my-2">
                                <div className="flex items-center" onClick={() => handleEdit(todo._id)}>
                                    <input type="checkbox" className="mr-3 w-5 h-5" />
                                    <span className="text-lg">{todo.task}</span>
                                </div>
                                <button onClick={() => handleDelete(todo._id)} className="text-red-500 hover:text-red-700">
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        ))

                }
            </div>
        </div>

    )
}
export default Home;