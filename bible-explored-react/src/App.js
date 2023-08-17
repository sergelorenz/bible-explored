import React, { useState } from 'react';
import './App.scss';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`App ${theme}`}>
      <div className='parent'>
        Hello World
      </div>
    </div>
  );
}

export default App;
