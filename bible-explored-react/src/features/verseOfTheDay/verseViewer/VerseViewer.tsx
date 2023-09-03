import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';

import { RootState } from '../../../app/store';

import { chooseVerseByDate } from '../../../utils/dataHandler';

import Spinner from '../../../common/components/spinner/Spinner';
import { VERSE_OF_THE_DAY_LIST } from '../../../common/constants';

import { useLazyFums } from '../../../common/hooks';
import { useLazyGetPassageQuery } from '../../../services/bibleExplored';

import './VerseViewer.scss';

function VerseViewer() {
  const bibleId = useSelector((state: RootState) => state.verseOfTheDay.bibleId);
  const [ getPassage, { data: dataPassage , isFetching: isFetchingPassage, isError: isErrorPassage}] = useLazyFums(useLazyGetPassageQuery);
  useEffect(() => {
    if (bibleId) {
      getPassage({
        bibleId: bibleId,
        passage: chooseVerseByDate(VERSE_OF_THE_DAY_LIST)
      })
    }
  }, [bibleId])

  return isFetchingPassage ? <Spinner /> : (
    dataPassage && (
      <div className='verse-viewer'>
        <div className='copyright'>{dataPassage.data.copyright}</div>
        <h2>Verse Of The Day</h2>
        <hr />
        <div 
          className='scripture-styles'
          data-cy='verse-of-the-day'
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(dataPassage.data.content)}}
        />
        <p className='source-verse'>{`− ${dataPassage.data.reference} −`}</p>
      </div>      
    )
  )
}

export default VerseViewer
