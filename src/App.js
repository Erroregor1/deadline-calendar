import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('all');

  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('ru-RU', options);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    const newTask = { id: Date.now(), title, date };
    const updatedTasks = [...tasks, newTask].sort((a, b) => new Date(a.date) - new Date(b.date));
    setTasks(updatedTasks);
    setTitle('');
    setDate('');
  };

  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    const now = new Date(today);
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    if (filter === 'overdue') return taskDate < now;
    if (filter === 'week') return taskDate >= now && taskDate <= nextWeek;
    return true; 
  });

  return (
    <div className="container">
      <h1>Календарь дедлайнов</h1>
      <p>Сегодня: {today}</p>

      <form onSubmit={addTask}>
        <input type="text" placeholder="Название задания" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Добавить</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('week')}>На этой неделе</button>
        <button onClick={() => setFilter('overdue')}>Просроченные</button>
      </div>

<ul>
        {filteredTasks.map(task => {
          const isExpired = new Date(task.date) < new Date(today);
          return (
            <li key={task.id} className={isExpired ? 'expired' : ''}>
              {/* Используем нашу функцию formatDate здесь */}
              <strong>{task.title}</strong> — {formatDate(task.date)}
              {isExpired && <span> (ПРОСРОЧЕНО)</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;