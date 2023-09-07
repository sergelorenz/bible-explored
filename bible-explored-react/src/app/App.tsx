import React from 'react';
import { useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { RootState } from './store';

import ErrorPopup from '../common/components/errorListener/ErrorPopup';
import Navigation from '../features/navigation/Navigation';
import Home from '../features/home/Home';
import Footer from '../features/footer/Footer';
import BooksAndChapters from '../features/booksAndChapters/BooksAndChapters';
import VerseOfTheDay from '../features/verseOfTheDay/VerseOfTheDay';
import SideBySide from '../features/sideBySide/SideBySide';

import {
  MENU_HOME,
  MENU_BOOKS_AND_CHAPTERS,
  MENU_VERSE_OF_THE_DAY,
  MENU_SIDE_BY_SIDE
} from '../common/constants';

import '../common/sass/scripture-styles.scss';
import './App.scss';

function App() {
  const theme = useSelector((state: RootState) => state.parent.theme);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <div className='parent'>
          <Navigation />
          <Routes>
            <Route path={`/${MENU_HOME}`} element={<Home />}/>
            <Route path={`/${MENU_BOOKS_AND_CHAPTERS}`} element={<BooksAndChapters />} />
            <Route path={`/${MENU_VERSE_OF_THE_DAY}`} element={<VerseOfTheDay />} />
            <Route path={`/${MENU_SIDE_BY_SIDE}`} element={<SideBySide />} />
            <Route path='*' element={<Navigate to={`/${MENU_HOME}`} />} />
          </Routes>
          <Footer />
        </div>
        <ErrorPopup />
      </div>
    </Router>
  );
}

export default App;
