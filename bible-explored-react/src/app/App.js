import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';

import Navigation from '../features/navigation/Navigation';

function App() {
  const theme = useSelector(state => state.parent.theme);

  return (
    <div className={`App ${theme}`}>
      <div className='parent'>
        <Navigation />
      </div>
    </div>
  );
}

export default App;
