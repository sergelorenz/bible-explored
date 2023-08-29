import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { useFums } from '../../common/hooks';
import { useGetBiblesQuery } from '../../services/bibleExplored';
import { setBible } from './booksAndChapterSlice';

import { RootState } from '../../app/store';
import { Bible } from '../../../types/api';
import { BibleLanguageGroup } from '../../../types/types';

import Content from '../../common/components/content/Content'
import DropDown, { DropDownHandle } from '../../common/components/dropdown/DropDown'
import Spinner from '../../common/components/spinner/Spinner';
import BooksAndChapterNavigator from './booksAndChapterNavigator/BooksAndChapterNavigator';
import BibleViewer from './bibleViewer/BibleViewer';

import './BooksAndChapters.scss';

function BooksAndChapters() {
  const dispatch = useDispatch();
  const [ tempBible, setTempBible ] = useState<Bible | null>(null)
  const bibleName = useSelector((state: RootState) => state.booksAndChapter.bibleName);
  const isGoPressed = useSelector((state: RootState) => state.booksAndChapter.isGoPressed);
  const isViewerInitialized = useSelector((state: RootState) => state.booksAndChapter.isViewerInitialized);
  const { data: dataBibles, isLoading: isLoadingBibles } = useFums(useGetBiblesQuery);
  const bibleVersionsRef = useRef<DropDownHandle | null>(null);

  const handleSelectBible = (bible: Bible) => {
    setTempBible(bible);
    bibleVersionsRef.current?.toggleDropDown();
  }

  const handlePressGo = (e: React.MouseEvent<HTMLElement>) => {
    if (tempBible) {
      dispatch(setBible(tempBible))
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
                data-cy={bible.bibleName} 
                key={bible.bibleId}
                onClick={() => handleSelectBible({
                  id: bible.bibleId,
                  name: bible.bibleName, 
                  language: {
                    id: bibleGroup.languageId, 
                    name: bibleGroup.languageName
                  }
                })}
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
            value={tempBible ? tempBible.name : 'Select a Bible Version'}
            ref={bibleVersionsRef}
          >
            {isLoadingBibles && <Spinner />}
            {dataBibles && renderBibleGroups(dataBibles)}
          </DropDown>
          <input data-cy='bible-select-go' type='button' value='GO' onClick={handlePressGo}/>
        </div>
        { bibleName && isGoPressed && (
          <div className='bible-content-area'>
            <BooksAndChapterNavigator />
            {isViewerInitialized && <BibleViewer />}
          </div>
        )}
      </div>
    </Content>
  )
}

export default BooksAndChapters