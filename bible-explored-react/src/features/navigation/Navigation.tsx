import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  MENU_HOME,
  MENU_BOOKS_AND_CHAPTERS,
  MENU_VERSE_OF_THE_DAY,
  MENU_SIDE_BY_SIDE
} from '../../common/constants';

import { RootState } from '../../app/store';
import { toggleTheme } from '../../app/parentSlice';

import { ReactComponent as BibleIcon } from '../../res/icons/bible-icon.svg';
import { ReactComponent as IdeaIcon } from '../../res/icons/idea-icon.svg';
import { ReactComponent as SideBySideIcon } from '../../res/icons/compare-svgrepo-com.svg';

import Toggler from '../../common/components/toggler/Toggler';

import './Navigation.scss';

function Navigation() {
  const theme = useSelector((state: RootState) => state.parent.theme);
  const selectedMenu = useSelector((state: RootState) => state.parent.selectedMenu);
  const dispatch = useDispatch();

  const toggleThemeAction = () => {
    dispatch(toggleTheme());
  }

  return (
    <div className='navigation'>
      <div className='header-links'>
        <Link to={`/${MENU_HOME}`}>
          <h1>BIBLE EXPLORED</h1>
        </Link>
        <div className='header-icons'>
          <Link to={`/${MENU_BOOKS_AND_CHAPTERS}`}>
            <BibleIcon className={MENU_BOOKS_AND_CHAPTERS === selectedMenu ? 'selected' : ''}/>
          </Link>
          <Link to={`/${MENU_VERSE_OF_THE_DAY}`}>
            <IdeaIcon className={MENU_VERSE_OF_THE_DAY === selectedMenu ? 'selected' : ''}/>
          </Link>
          <Link to={`/${MENU_SIDE_BY_SIDE}`}>
            <SideBySideIcon className={MENU_SIDE_BY_SIDE === selectedMenu ? 'selected' : ''}/>
          </Link>
        </div>
      </div>
      <Toggler 
        className='theme-toggler' 
        label={<p>Switch to <span>{`${theme === 'light' ? 'Dark' : 'Light'} Mode`}</span></p>}
        defaultValue={theme === 'light'}
        onToggleValue={toggleThemeAction}
      />
    </div>
  )
}

export default Navigation