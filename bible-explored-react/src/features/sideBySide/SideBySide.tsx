import React from 'react'

import Content from '../../common/components/content/Content'
import VerseSelector from '../../common/components/verseSelector/VerseSelector'

import { setScripture } from './sideBySideSlice';

import './SideBySide.scss';

function SideBySide() {
  return (
    <Content>
      <div className='content side-by-side'>
        <VerseSelector 
          defaultScripture={{book: 'JHN', chapter: 1, verse: 1}}
          onPressGoAction={setScripture}
        />
      </div>
    </Content>
  )
}

export default SideBySide