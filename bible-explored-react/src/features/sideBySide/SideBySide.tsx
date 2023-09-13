import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import shortUUID from 'short-uuid';

import { RootState } from '../../app/store';

import Content from '../../common/components/content/Content'
import VerseSelector from '../../common/components/verseSelector/VerseSelector'

import { addVersion } from './sideBySideSlice';

import { ReactComponent as AddIcon } from '../../res/icons/add-icon.svg';

import { VersionViewerMemoized } from './versionViewer/VersionViewer';

import { setScripture, setVerseCount, goAnotherVerse } from './sideBySideSlice';

import './SideBySide.scss';

function SideBySide() {
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.sideBySide.bookId);
  const chapter = useSelector((state: RootState) => state.sideBySide.chapter);
  const verseNumber = useSelector((state: RootState) => state.sideBySide.verse);
  const verseCount = useSelector((state: RootState) => state.sideBySide.verseCount);
  const verseViewerList = useSelector((state :RootState) => state.sideBySide.verseViewerList);
  const verseViewerKeys = useSelector((state: RootState) => state.sideBySide.verseViewerKeys);

  const handleAddVersion = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(addVersion());
  }

  const renderVersionViewers = () => {
    return (
      verseViewerList.map((version, index) => (
        <VersionViewerMemoized 
          key={verseViewerKeys[index]} 
          versionViewerIndex={index}
          version={version}
          isDisabledClose={verseViewerList.length <= 1}
        />
      ))
    )
  }

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
          {renderVersionViewers()}
          <div className='add-version' onClick={handleAddVersion}>
            <AddIcon />
          </div>
        </div>
      </div>
    </Content>
  )
}

export default SideBySide