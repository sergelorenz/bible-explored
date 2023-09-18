import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import { SUUID } from 'short-uuid';

import { updateVersion, removeVersion } from '../sideBySideSlice';

import { RootState } from '../../../app/store';

import { formPassage, htmlToText } from '../../../utils/dataHandler';

import { useLazyFums } from '../../../common/hooks';
import { useLazyGetPassageQuery } from '../../../services/bibleExplored';

import { VERSE_VIEWER_INITIAL_VERSION_NAME } from '../../../common/constants';
import { ReactComponent as CloseIcon } from '../../../res/icons/close-icon.svg';
import { ReactComponent as CopyIcon } from '../../../res/icons/copy-file-icon.svg';

import Spinner from '../../../common/components/spinner/Spinner';
import AppearAnimate, { AppearAnimateHandle } from '../../../common/components/appearAnimate/AppearAnimate';
import BibleGroupSelector, { Bible } from '../../../common/components/bibleGroupSelector/BibleGroupSelector';
import IconButton from '../../../common/components/iconButton/IconButton';

import './VersionViewer.scss';

type Props = {
  versionViewerKey: SUUID,
  version: string,
  isDisabledClose: boolean
}

function VersionViewer({versionViewerKey, version, isDisabledClose}: Props) {
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
    dispatch(updateVersion({key: versionViewerKey, newVersion: newVersion.id}));
    setVersionName(newVersion.name);
  }

  const handleCloseVersionViewer = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDisabledClose) {
      versionViewerRef.current?.disappear();
      setTimeout(() => {
        dispatch(removeVersion(versionViewerKey));
      }, 300)
    }
  }

  const handleCopyPassage = async (e: React.MouseEvent<HTMLDivElement>) => {
    await navigator.clipboard.writeText(htmlToText(dataPassage.data.content));
    alert('Successfully copied passage to clipboard');
  }

  return (
    <AppearAnimate 
      styleAppear={{opacity: 1, width: '400px', fontSize: '1em'}}
      styleDisappear={{opacity: 0, width: '0px', fontSize: '0.001em'}}
      ref={versionViewerRef}
      enableRemove={false}
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
            width='25px'
            onButtonClick={handleCloseVersionViewer}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className='version-viewer-body'>
          <div className='version-viewer-version'>
            {isFetchingPassage && !dataPassage && <Spinner />}
            {dataPassage && (
              <p>
                {`${dataPassage.data.reference} - `}
                <span>{versionName}</span>
              </p>
            )}
          </div>
          <div className='version-viewer-verse'>
            {isFetchingPassage && !dataPassage && <Spinner />}
            {dataPassage && !isErrorPassage && (
              <div 
                className='scripture-styles'
                data-cy='side-by-side-version-viewer'
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(dataPassage.data.content)}}
              />
            )}
            {isErrorPassage && (
              <p className='side-by-side-version-viewer-error'>
                Could not fetch data for this passage from <span>{versionName}</span>
              </p>
            )}
          </div>
          <div className='version-viewer-buttons'>
            <IconButton
              width='35px'
              onButtonClick={handleCopyPassage}
            >
              <CopyIcon />
            </IconButton>
          </div>
          {dataPassage && (
            <div className='version-viewer-copyright'>
              <p>{dataPassage.data.copyright}</p>
            </div>
          )}
        </div>
      </div>
    </AppearAnimate>
  )
}

export const VersionViewerMemoized = React.memo(VersionViewer);
