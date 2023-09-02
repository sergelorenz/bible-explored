import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { addError } from '../../app/parentSlice';
import { setBible } from './booksAndChapterSlice';

import { useFums } from '../../common/hooks';
import { useGetBiblesQuery } from '../../services/bibleExplored';

import { RootState } from '../../app/store';
import { Bible } from '../../../types/api';
import { BibleLanguageGroup } from '../../../types/types';

import BibleGroupSelector from '../../common/components/bibleGroupSelector/BibleGroupSelector';
import Content from '../../common/components/content/Content'
import DropDown, { DropDownHandle } from '../../common/components/dropdown/DropDown'
import Spinner from '../../common/components/spinner/Spinner';
import BooksAndChapterNavigator from './booksAndChapterNavigator/BooksAndChapterNavigator';
import BibleViewer from './bibleViewer/BibleViewer';

import './BooksAndChapters.scss';

function BooksAndChapters() {
  const bibleName = useSelector((state: RootState) => state.booksAndChapter.bibleName);
  const isGoPressed = useSelector((state: RootState) => state.booksAndChapter.isGoPressed);
  const isViewerInitialized = useSelector((state: RootState) => state.booksAndChapter.isViewerInitialized);

  return (
    <Content>
      <div className='content books-and-chapters'>
        <BibleGroupSelector dispatchSelectBible={setBible}/>
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