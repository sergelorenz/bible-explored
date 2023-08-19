import React from 'react';
import { useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './App.scss';

import Navigation from '../features/navigation/Navigation';
import Home from '../features/home/Home';
import Footer from '../features/footer/Footer';

function App() {
  const theme = useSelector(state => state.parent.theme);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <div className='parent'>
          <Navigation />
          <Routes>
            <Route path='/home' element={<Home />}/>
            <Route path='*' element={<Navigate to='/home' />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
