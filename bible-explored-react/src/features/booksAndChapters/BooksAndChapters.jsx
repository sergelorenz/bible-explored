import React from 'react'

import Content from '../../common/components/content/Content'
import DropDown from '../../common/components/dropdown/DropDown'

import { useGetBiblesQuery } from '../../services/bibleExplored';

import './BooksAndChapters.scss';

function BooksAndChapters() {
  const { data, error, isLoading } = useGetBiblesQuery();

  console.log(data);

  return (
    <Content>
      <div className='content books-and-chapters'>
        <div className='bible-select-area'>
          <DropDown className='bible-select'>
            <div>Sample dropdown</div>
          </DropDown>
          <input type='button' value='GO'/>
        </div>
      </div>
    </Content>
  )
}

export default BooksAndChapters