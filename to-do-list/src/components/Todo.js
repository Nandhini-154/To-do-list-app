import React, { useState } from 'react';

import './TodoList.css'; // Import a custom stylesheet for additional styling

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState({ id: null, text: '' });

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTaskHandler = (id, text) => {
    setEditTask({ id, text });
  };

  const updateTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editTask.id ? { id: task.id, text: editTask.text } : task
    );
    setTasks(updatedTasks);
    setEditTask({ id: null, text: '' });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">List it!</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary mt-2 rounded-pill" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editTask.id === task.id ? (
              <input
                type="text"
                className="form-control"
                value={editTask.text}
                onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
              />
            ) : (
              task.text
            )}
            <div>
              <br></br>
              {editTask.id === task.id ? (
                <button className="btn btn-success me-2 rounded-pill" onClick={updateTask}>
                  Update
                </button> 
              ) : (
                <button className="btn btn-warning me-2 rounded-pill" onClick={() => editTaskHandler(task.id, task.text)}>
                  Edit
                </button>
              )}
              <button className="btn btn-danger rounded-pill" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
