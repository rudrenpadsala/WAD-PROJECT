import React, { useState } from 'react';

const Reminders = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', date: '' });

    const handleAddTask = () => {
        if (!newTask.title || !newTask.date) return;

        const task = {
            id: Date.now(),
            title: newTask.title,
            date: newTask.date,
            completed: false
        };

        setTasks([...tasks, task]);
        setNewTask({ title: '', date: '' });
        setShowModal(false);
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleCompleteTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <main className="main" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div className="title-row" style={{ maxWidth: '800px' }}>
                <div>
                    <h1>Daily Schedule</h1>
                    <p className="subtitle">Never miss a critical task for your crops.</p>
                </div>

                <button className="new-task" onClick={() => setShowModal(true)}>
                    + New Task
                </button>
            </div>

            {tasks.length === 0 ? (
                <div className="empty-state">
                    <div className="bell">🔔</div>
                    <h3>No active reminders</h3>
                    <p>Add a task to get started!</p>
                </div>
            ) : (
                <div className="reminders-list" style={{ maxWidth: '800px' }}>
                    {tasks.map(task => (
                        <div key={task.id} className="reminder-item" style={{ opacity: task.completed ? 0.6 : 1 }}>
                            <div className="reminder-content">
                                <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.title}
                                </h3>
                                <p>Due: {task.date}</p>
                            </div>
                            <div className="reminder-actions">
                                <div
                                    className="action-icon complete-icon"
                                    onClick={() => handleCompleteTask(task.id)}
                                    title={task.completed ? "Mark Incomplete" : "Mark Complete"}
                                >
                                    ✓
                                </div>
                                <div
                                    className="action-icon delete-icon"
                                    onClick={() => handleDeleteTask(task.id)}
                                    title="Delete Task"
                                >
                                    🗑️
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Add New Task</h2>
                        <input
                            type="text"
                            placeholder="Task Name (e.g., Water Crops)"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newTask.date}
                            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                        />
                        <div className="modal-buttons">
                            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleAddTask}>Add Task</button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="footer" style={{ width: '100%', maxWidth: '800px', marginTop: 'auto' }}>
                <h2>FarmWise Intelligence</h2>
                <div className="stats">
                    <div>
                        <h1>{tasks.length}</h1>
                        <p>TASKS</p>
                    </div>
                    <div>
                        <h1>{tasks.filter(t => !t.completed).length}</h1>
                        <p>PENDING</p>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default Reminders;
