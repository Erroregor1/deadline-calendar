import React from 'react';
import './App.css';

function App() {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container">
      <h1>Календарь дедлайнов</h1>
      <p>Сегодня: {today}</p>
    </div>
  );
}

export default App;