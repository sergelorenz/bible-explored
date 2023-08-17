import React from 'react'

import { ReactComponent as BibleIcon } from '../../res/icons/bible-icon.svg';
import { ReactComponent as IdeaIcon } from '../../res/icons/idea-icon.svg';
import { ReactComponent as SideBySideIcon } from '../../res/icons/compare-svgrepo-com.svg';

import './Navigation.scss';

function Navigation() {
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
      <div className='theme-toggler'>Theme toggler</div>
    </div>
  )
}

export default Navigation