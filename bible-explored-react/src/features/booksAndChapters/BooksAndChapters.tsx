import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { useGetBiblesQuery } from '../../services/bibleExplored';
import { setBible, pressGo } from './booksAndChapterSlice';

import { RootState } from '../../app/store';
import { BibleLanguageGroup } from '../../../types/types';

import Content from '../../common/components/content/Content'
import DropDown, { DropDownHandle } from '../../common/components/dropdown/DropDown'
import Spinner from '../../common/components/spinner/Spinner';
import BooksAndChapterNavigator from './booksAndChapterNavigator/BooksAndChapterNavigator';
import BibleViewer from './bibleViewer/BibleViewer';

import './BooksAndChapters.scss';

function BooksAndChapters() {
  const dispatch = useDispatch();
  const bibleName = useSelector((state: RootState) => state.booksAndChapter.bibleName);
  const { data, isLoading } = useGetBiblesQuery();
  const bibleVersionsRef = useRef<DropDownHandle | null>(null);

  const handleSelectBible = (bibleId: string, bibleName: string) => {
    dispatch(setBible({bibleId: bibleId, bibleName: bibleName}))
    bibleVersionsRef.current?.toggleDropDown();
  }

  const handlePressGo = (e: React.MouseEvent<HTMLElement>) => {
    if (bibleName) {
      dispatch(pressGo());
    }
  }

  const renderBibleGroups = (bibleGroups: BibleLanguageGroup[]) => {
    return (
      bibleGroups.map(bibleGroup => (
        <div className='bible-group' key={bibleGroup.languageId}>
          <p>{bibleGroup.languageName}</p>
          <ul>
            {bibleGroup.bibles.map(bible => (
              <li 
                title={bible.bibleName} 
                key={bible.bibleId}
                onClick={() => handleSelectBible(bible.bibleId, bible.bibleName)}
              >
                {bible.bibleName}
              </li>
            ))}
          </ul>
        </div>
      ))
    )
  }

  return (
    <Content>
      <div className='content books-and-chapters'>
        <div className='bible-select-area'>
          <DropDown 
            className='bible-select' 
            value={bibleName ? bibleName : 'Select a Bible Version'}
            ref={bibleVersionsRef}
          >
            {isLoading && <Spinner />}
            {data && renderBibleGroups(data)}
          </DropDown>
          <input type='button' value='GO' onClick={handlePressGo}/>
        </div>
        { bibleName && (
          <div className='bible-content-area'>
            <BooksAndChapterNavigator />
            <BibleViewer />
          </div>
        )}
      </div>
    </Content>
  )
}

export default BooksAndChapters