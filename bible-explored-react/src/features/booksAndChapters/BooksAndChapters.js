import React from 'react'

import Content from '../../common/components/content/Content'
import DropDown from '../../common/components/dropdown/DropDown'

import './BooksAndChapters.scss';

function BooksAndChapters() {
  return (
    <Content>
      <div className='content books-and-chapters'>
        <div className='bible-select-area'>
          <DropDown className='bible-select'/>
          <input type='button' value='GO'/>
        </div>
      </div>
    </Content>
  )
}

export default BooksAndChapters