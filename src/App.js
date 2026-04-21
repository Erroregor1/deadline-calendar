import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const addTask = (e) => {
    e.preventDefault();
    if (!title || !date) return;

    const newTask = { id: Date.now(), title, date };
    const updatedTasks = [...tasks, newTask].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setTasks(updatedTasks);
    setTitle('');
    setDate('');
  };

  return (
    <div className="container">
      <h1>Календарь дедлайнов</h1>
      <p>Сегодня: {today}</p>

      <form onSubmit={addTask}>
        <input type="text" placeholder="Название задания" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Добавить</button>
      </form>

      <ul>
        {tasks.map(task => {
          const isExpired = new Date(task.date) < new Date(today);
          return (
            <li key={task.id} className={isExpired ? 'expired' : ''}>
              <strong>{task.title}</strong> — {task.date}
              {isExpired && <span> (ПРОСРОЧЕНО)</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;