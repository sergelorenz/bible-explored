import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';

import { setBible } from './verseOfTheDaySlice';

import VerseViewer from './verseViewer/VerseViewer';

import Content from '../../common/components/content/Content'
import BibleGroupSelector from '../../common/components/bibleGroupSelector/BibleGroupSelector';

import './VerseOfTheDay.scss';

function VerseOfTheDay() {
  const bibleId = useSelector((state: RootState) => state.verseOfTheDay.bibleId);
  const bibleName = useSelector((state: RootState) => state.verseOfTheDay.bibleName);

  return (
    <Content>
      <div className='content verse-of-the-day'>
        <BibleGroupSelector 
          dispatchSelectBible={setBible}
          defaultValue={{
            id: bibleId,
            name: bibleName
          }}
        />
        <div className='verse-of-the-day-container'>
          <VerseViewer />
        </div>
      </div>
    </Content>
  )
}

export default VerseOfTheDay