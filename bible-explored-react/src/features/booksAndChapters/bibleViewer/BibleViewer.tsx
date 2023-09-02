import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DOMPurify from 'dompurify';

import { addError } from '../../../app/parentSlice';

import { ChapterContent } from '../../../../types/api';
import { RootState } from '../../../app/store';

import { useLazyFums } from '../../../common/hooks';
import { useLazyGetVersesQuery } from '../../../services/bibleExplored';

import Spinner from '../../../common/components/spinner/Spinner';
import FlexItemAnimate from '../../../common/components/flexItemAnimate/FlexItemAnimate'

import '../../../common/sass/scripture-styles.scss';
import './BibleViewer.scss';


function BibleViewer() {
  const dispatch = useDispatch()
  const bibleId = useSelector((state: RootState) => state.booksAndChapter.bibleId);
  const bibleName = useSelector((state: RootState) => state.booksAndChapter.bibleName);
  const bookId = useSelector((state: RootState) => state.booksAndChapter.bookId);
  const bookNameLong = useSelector((state: RootState) => state.booksAndChapter.bookNameLong);
  const bookName = useSelector((state: RootState) => state.booksAndChapter.bookName);
  const chapter = useSelector((state: RootState) => state.booksAndChapter.chapter);
  const [ getVerses, { data: dataVerses , isFetching: isFetchingVerses, isError: isErrorVerses}] = useLazyFums(useLazyGetVersesQuery); 

  useEffect(() => {
    if (chapter > 0) {
      getVerses({bibleId: bibleId, bookId: bookId, chapter: chapter});
    }
  }, [chapter])
  useEffect(() => {
    if (isErrorVerses) {
      dispatch(addError(`Apologies, Verse Data from ${bookName} ${chapter} (${bibleName}) could not be fetched right now. Please try a different Bible Version or Try again Later.`))
    }
  }, [isErrorVerses])

  const renderVerses = (chapterContent: ChapterContent) => (
    <Fragment>
      <div 
        className='scripture-styles' 
        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(chapterContent.content)}}
        data-cy='verses'
      />
      <div className='copyright'>
        {chapterContent.copyright}
      </div>
    </Fragment>
  )

  return (
    <FlexItemAnimate styleProp={{width: '640px', opacity: 1}}>
      <div className='bible-viewer'>
        <h3>{bookNameLong.toUpperCase()}</h3>
        <hr />
        <h3>{chapter ? `Chapter ${chapter}` : ''}</h3>
        {(!chapter || isFetchingVerses) ? <Spinner /> : (
          dataVerses && renderVerses(dataVerses.data)
        )}
      </div>
    </FlexItemAnimate>
  )
}

export default BibleViewer