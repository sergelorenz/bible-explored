import React, { useRef, useState } from 'react'

import { BibleLanguageGroup } from '../../../types/types';
import { PASSAGE_LENGTH } from '../../common/constants';

import Content from '../../common/components/content/Content'
import DropDown, { DropDownHandle } from '../../common/components/dropdown/DropDown'
import Spinner from '../../common/components/spinner/Spinner';

import { useFums } from '../../common/hooks/useFums';
import { useGetBiblesQuery, useGetVersesQuery } from '../../services/bibleExplored';

import './BooksAndChapters.scss';

function BooksAndChapters() {
  const { data, error, isLoading } = useGetBiblesQuery();
  const { data: dataVerses } = useFums(useGetVersesQuery, {bibleId: 'de4e12af7f28f599-02', chapter: 'GEN.1'})
  const [ bibleUsed, setBibleUsed] = useState('');
  const [ bookUsed, setBookUsed] = useState('GEN');
  const [ chapterUsed, setChapterUsed ] = useState(1);
  const [ passageUsed, setPassageUsed ] = useState(`GEN.1.1-GEN.1.${PASSAGE_LENGTH}`)
  const booksRef= useRef<DropDownHandle | null>(null);

  console.log('data from useFums', dataVerses);

  const handleSelectBible = (bibleName: string) => {
    setBibleUsed(bibleName);
    booksRef.current?.toggleDropDown();
  }

  const renderBibleGroups = (bibleGroups: BibleLanguageGroup[]) => {
    return (
      bibleGroups.map(bibleGroup => (
        <div className='bible-group' key={bibleGroup.languageId}>
          <p>{bibleGroup.languageName}</p>
          <ul>
            {bibleGroup.bibles.map(bible => (
              <li 
                title={bible.bibleName} 
                key={bible.bibleId}
                onClick={() => handleSelectBible(bible.bibleName)}
              >
                {bible.bibleName}
              </li>
            ))}
          </ul>
        </div>
      ))
    )
  }

  return (
    <Content>
      <div className='content books-and-chapters'>
        <div className='bible-select-area'>
          <DropDown 
            className='bible-select' 
            value={bibleUsed ? bibleUsed : 'Select a Bible Version'}
            ref={booksRef}
          >
            {isLoading && <Spinner />}
            {data && renderBibleGroups(data)}
          </DropDown>
          <input type='button' value='GO' />
        </div>
      </div>
    </Content>
  )
}

export default BooksAndChapters