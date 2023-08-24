import React from 'react'

import Content from '../../common/components/content/Content'
import DropDown from '../../common/components/dropdown/DropDown'
import Spinner from '../../common/components/spinner/Spinner';

import { useGetBiblesQuery } from '../../services/bibleExplored';


import './BooksAndChapters.scss';

function BooksAndChapters() {
  const { data, error, isLoading } = useGetBiblesQuery();

  const renderBibleGroups = bibleGroups => {
    return (
      bibleGroups.map(bibleGroup => (
        <div className='bible-group' key={bibleGroup.languageId}>
          <p>{bibleGroup.languageName}</p>
          <ul>
            {bibleGroup.bibles.map(bible => (
              <li title={bible.bibleName} key={bible.bibleId}>{bible.bibleName}</li>
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
          <DropDown className='bible-select' placeHolder='Select a Bible Version'>
            {isLoading && <Spinner />}
            {data && renderBibleGroups(data)}
          </DropDown>
          <input type='button' value='GO'/>
        </div>
      </div>
    </Content>
  )
}

export default BooksAndChapters