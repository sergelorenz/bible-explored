import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { toggleTheme } from '../../app/parentSlice';

import { ReactComponent as BibleIcon } from '../../res/icons/bible-icon.svg';
import { ReactComponent as IdeaIcon } from '../../res/icons/idea-icon.svg';
import { ReactComponent as SideBySideIcon } from '../../res/icons/compare-svgrepo-com.svg';

import Toggler from '../../common/components/toggler/Toggler';

import './Navigation.scss';

function Navigation() {
  const theme = useSelector(state => state.parent.theme);
  const dispatch = useDispatch();

  const _toggleTheme = () => {
    dispatch(toggleTheme());
  }

  return (
    <div className='navigation'>
      <div className='header-links'>
        <h1>BIBLE EXPLORED</h1>
        <div className='header-icons'>
          <BibleIcon />
          <IdeaIcon />
          <SideBySideIcon />
        </div>
      </div>
      <Toggler 
        className='theme-toggler' 
        label={<p>Switch to <span>{`${theme === 'light' ? 'Dark' : 'Light'} Mode`}</span></p>}
        defaultValue={theme === 'light'}
        onToggleValue={_toggleTheme}
      />
    </div>
  )
}

export default Navigation