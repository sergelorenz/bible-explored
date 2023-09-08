import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { RootState } from '../../../../app/store';

import { addReference } from '../../../../utils/dataHandler';

import { useFums } from '../../../../common/hooks';

import { useGetPassageQuery } from '../../../../services/bibleExplored';

type Props = {
  verse: string,
  onVerseLoad: Function,
  index: number
}

function PassageLoader({verse, onVerseLoad, index}: Props) {
  const bibleId = useSelector((state: RootState) => state.verseOfTheDay.bibleId)
  const { data: dataPassage, isError: isErrorPassage } = useFums(useGetPassageQuery, {bibleId: bibleId, passage: verse});

  useEffect(() => {
    if (dataPassage) {
      onVerseLoad(index, addReference(dataPassage.data));
    } else if (isErrorPassage) {
      onVerseLoad(index, 'Error');
    }
  }, [dataPassage, isErrorPassage])

  return null;
}

export default PassageLoader