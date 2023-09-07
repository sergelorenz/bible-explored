import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { RootState } from '../../../../app/store';

import { useGetPassageQuery } from '../../../../services/bibleExplored';

type Props = {
  verse: string,
  onVerseLoad: Function,
  index: number
}

function PassageLoader({verse, onVerseLoad, index}: Props) {
  const bibleId = useSelector((state: RootState) => state.verseOfTheDay.bibleId)
  const { data: dataPassage, isError: isErrorPassage } = useGetPassageQuery({bibleId: bibleId, passage: verse});

  useEffect(() => {
    if (dataPassage) {
      onVerseLoad(index, dataPassage.data.content);
    } else if (isErrorPassage) {
      onVerseLoad(index, 'Error');
    }
  }, [dataPassage, isErrorPassage])

  return null;
}

export default PassageLoader