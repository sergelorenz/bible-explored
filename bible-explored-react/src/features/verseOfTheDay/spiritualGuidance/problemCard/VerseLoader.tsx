import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { RootState } from '../../../../app/store';

import { useGetPassageQuery } from '../../../../services/bibleExplored';

type Props = {
  verse: string,
  onVerseLoad: Function
}

function VerseLoader({verse, onVerseLoad}: Props) {
  const bibleId = useSelector((state: RootState) => state.verseOfTheDay.bibleId)
  const { data: dataPassage, isError: isErrorPassage } = useGetPassageQuery({bibleId: bibleId, passage: verse});

  useEffect(() => {
    if (dataPassage) {
      onVerseLoad(1);
    } else if (isErrorPassage) {
      onVerseLoad(2);
    }
  }, [dataPassage, isErrorPassage])

  return null;
}

export default VerseLoader