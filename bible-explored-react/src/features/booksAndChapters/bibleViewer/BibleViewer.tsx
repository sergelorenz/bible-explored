import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { RootState } from '../../../app/store';

import { useLazyFums } from '../../../common/hooks';
import { useLazyGetVersesQuery } from '../../../services/bibleExplored';

import FlexItemAnimate from '../../../common/components/flexItemAnimate/FlexItemAnimate'

function BibleViewer() {
  const bibleId = useSelector((state: RootState) => state.booksAndChapter.bibleId);
  const bookId = useSelector((state: RootState) => state.booksAndChapter.bookId);
  const chapter = useSelector((state: RootState) => state.booksAndChapter.chapter);
  const [ getVerses, { data: dataVerses , isLoading: isLoadingVerses, isError: isErrorVerses}] = useLazyFums(useLazyGetVersesQuery); 

  useEffect(() => {
    if (chapter > 0) {
      getVerses({bibleId: bibleId, bookId: bookId, chapter: chapter});
    }
  }, [chapter])

  return (
    <FlexItemAnimate styleProp={{width: '640px'}}>
      <div className='bible-viewer'>BibleViewer</div>
    </FlexItemAnimate>
  )
}

export default BibleViewer