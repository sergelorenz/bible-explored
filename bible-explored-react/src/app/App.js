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
import BooksAndChapters from '../features/booksAndChapters/BooksAndChapters';

import {
  MENU_HOME,
  MENU_BOOKS_AND_CHAPTERS,
  //MENU_VERSE_OF_THE_DAY,
  //MENU_SIDE_BY_SIDE
} from '../common/constants';

function App() {
  const theme = useSelector(state => state.parent.theme);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <div className='parent'>
          <Navigation />
          <Routes>
            <Route path={`/${MENU_HOME}`} element={<Home />}/>
            <Route path={`/${MENU_BOOKS_AND_CHAPTERS}`} element={<BooksAndChapters />} />
            <Route path='*' element={<Navigate to={`/${MENU_HOME}`} />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
