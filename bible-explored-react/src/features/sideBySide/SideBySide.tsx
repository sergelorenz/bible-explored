import React from 'react'
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';

import Content from '../../common/components/content/Content'
import VerseSelector from '../../common/components/verseSelector/VerseSelector'

import { ReactComponent as AddIcon } from '../../res/icons/add-icon.svg';

import { setScripture, setVerseCount, goAnotherVerse } from './sideBySideSlice';

import './SideBySide.scss';

function SideBySide() {
  const book = useSelector((state: RootState) => state.sideBySide.bookId);
  const chapter = useSelector((state: RootState) => state.sideBySide.chapter);
  const verseNumber = useSelector((state: RootState) => state.sideBySide.verse);
  const verseCount = useSelector((state: RootState) => state.sideBySide.verseCount);

  return (
    <Content>
      <div className='content side-by-side'>
        <VerseSelector 
          defaultScripture={{book: book, chapter: chapter, verse: verseNumber, bookName: 'John'}}
          onPressGoAction={setScripture}
          onPressAdjustVerseCountAction={setVerseCount}
          onPressAnotherVerseAction={goAnotherVerse}
          verseCount={verseCount}
        />
        <div className='version-viewer-container'>
          <div className='add-version'>
            <AddIcon />
          </div>
        </div>
      </div>
    </Content>
  )
}

export default SideBySide