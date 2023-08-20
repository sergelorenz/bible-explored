import React from 'react';
import { Link } from 'react-router-dom';

import {
  MENU_BOOKS_AND_CHAPTERS,
  MENU_VERSE_OF_THE_DAY,
  MENU_SIDE_BY_SIDE
} from '../../common/constants';

import { ReactComponent as BibleIcon } from '../../res/icons/bible-icon.svg';
import { ReactComponent as IdeaIcon } from '../../res/icons/idea-icon.svg';
import { ReactComponent as SideBySideIcon } from '../../res/icons/compare-svgrepo-com.svg';

import './Home.scss';

function Home() {
  return (
    <div className='content home'>
      <Link to={`/${MENU_BOOKS_AND_CHAPTERS}`}>
        <div className='menu'>
          <BibleIcon />
          <h2>Search Books and Chapters</h2>
          <p>Expand your biblical knowledge by checking out Bible books and chapters.</p>
        </div>
      </Link>
      <Link to={`/${MENU_VERSE_OF_THE_DAY}`}>
        <div className='menu'>
          <IdeaIcon />
          <h2>Verse of the Day and Spiritual Guidance</h2>
          <p>Learn God's message for you today and seek guidance from the Word to further your Spiritual Path.</p>
        </div>
      </Link>
      <Link to={`/${MENU_SIDE_BY_SIDE}`}>
        <div className='menu'>
          <SideBySideIcon />
          <h2>Side-by-Side Verses</h2>
          <p>Read God's word across different Bible versions and in different tongues.</p>
        </div>
      </Link>
    </div>
  )
}

export default Home