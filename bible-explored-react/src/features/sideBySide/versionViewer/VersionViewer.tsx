import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { updateVersion, removeVersion } from '../sideBySideSlice';

import { RootState } from '../../../app/store';

import { formPassage } from '../../../utils/dataHandler';

import { useLazyFums } from '../../../common/hooks';
import { useLazyGetPassageQuery } from '../../../services/bibleExplored';

import { VERSE_VIEWER_INITIAL_VERSION_NAME } from '../../../common/constants';
import { ReactComponent as CloseIcon } from '../../../res/icons/close-icon.svg';

import Spinner from '../../../common/components/spinner/Spinner';
import AppearAnimate, { AppearAnimateHandle } from '../../../common/components/appearAnimate/AppearAnimate';
import BibleGroupSelector, { Bible } from '../../../common/components/bibleGroupSelector/BibleGroupSelector';
import IconButton from '../../../common/components/iconButton/IconButton';

type Props = {
  versionViewerKey: number,
  version: string
}

function VersionViewer({versionViewerKey, version}: Props) {
  const dispatch = useDispatch();
  const [ versionName, setVersionName ] = useState(VERSE_VIEWER_INITIAL_VERSION_NAME)
  const bookId = useSelector((state: RootState) => state.sideBySide.bookId);
  const bookName = useSelector((state: RootState) => state.sideBySide.bookName);
  const chapter = useSelector((state: RootState) => state.sideBySide.chapter);
  const verse = useSelector((state: RootState) => state.sideBySide.verse);
  const verseCount = useSelector((state: RootState) => state.sideBySide.verseCount);
  const versionViewerRef = useRef<AppearAnimateHandle|null>(null);
  const [ getPassage, { data: dataPassage , isFetching: isFetchingPassage, isError: isErrorPassage}] = useLazyFums(useLazyGetPassageQuery);
  useEffect(() => {
    const passage = formPassage(bookId, chapter, verse, verseCount);
    getPassage({bibleId: version, passage: passage})
  }, [version, bookId, chapter, verse, verseCount])

  const handleSelectBible = (newVersion: Bible) => {
    dispatch(updateVersion({index: versionViewerKey, newVersion: newVersion.id}));
    setVersionName(newVersion.name);
  }

  const handleCloseVersionViewer = (e: React.MouseEvent<HTMLDivElement>) => {
    versionViewerRef.current?.disappear();
    setTimeout(() => {
      dispatch(removeVersion(versionViewerKey));
    }, 300)
  }

  return (
    <AppearAnimate 
      styleAppear={{opacity: 1, width: '400px'}}
      styleDisappear={{opacity: 0, width: '0px'}}
      ref={versionViewerRef}
    >
      <div className='version-viewer'>
        <div className='version-viewer-header'>
          <BibleGroupSelector 
            hasButton={false} 
            onSelectBible={handleSelectBible} 
            dropDownClassName='side-by-side-version-selector'
            defaultValue={{id: version, name: versionName}} 
          />
          <IconButton 
            className='close-version-viewer' 
            tooltip='Close this Version'
            width='20px'
            onButtonClick={handleCloseVersionViewer}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className='version-viewer-body'>
          {isFetchingPassage && <Spinner />}
          {dataPassage && <p className='version-viewer-version'>{`${dataPassage.data.reference} -`}</p>}
          <p className='version-viewer-version'>{versionName}</p>
        </div>
      </div>
    </AppearAnimate>
  )
}

export default VersionViewer