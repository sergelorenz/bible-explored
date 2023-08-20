import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as BibleIcon } from '../../res/icons/bible-icon.svg';
import { ReactComponent as IdeaIcon } from '../../res/icons/idea-icon.svg';
import { ReactComponent as SideBySideIcon } from '../../res/icons/compare-svgrepo-com.svg';

import './Home.scss';

function Home() {
  return (
    <div className='content home'>
      <Link to='/books-and-chapters'>
        <div className='menu'>
          <BibleIcon />
          <h2>Search Books and Chapters</h2>
          <p>Expand your biblical knowledge by checking out Bible books and chapters.</p>
        </div>
      </Link>
      <Link to='/verse-of-the-day'>
        <div className='menu'>
          <IdeaIcon />
          <h2>Verse of the Day and Spiritual Guidance</h2>
          <p>Learn God's message for you today and seek guidance from the Word to further your Spiritual Path.</p>
        </div>
      </Link>
      <Link to='/side-by-side'>
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