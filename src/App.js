import React, { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container">
      <h1>Календарь дедлайнов</h1>
      <p>Сегодня: {today}</p>

      <form>
        <input 
          type="text" 
          placeholder="Название задания" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default App;