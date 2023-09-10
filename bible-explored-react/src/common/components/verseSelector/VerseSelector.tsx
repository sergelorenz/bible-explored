import React, { useRef } from 'react'

import IconButton from '../iconButton/IconButton';

import DropDown, { DropDownHandle } from '../dropdown/DropDown';

import { ReactComponent as RemoveIcon } from '../../../res/icons/remove-icon.svg';
import { ReactComponent as DoubleArrowIcon } from '../../../res/icons/double-arrow-right-icon.svg';
import { ReactComponent as AddIcon } from '../../../res/icons/add-icon.svg';

import './VerseSelector.scss';

type Props = {
  defaultBook: string,
  defaultChapter: number,
  defaultVerse: number
}

function VerseSelector({defaultBook, defaultChapter, defaultVerse}: Props) {
  const booksRef = useRef<DropDownHandle | null>(null);
  const chapterRef = useRef<DropDownHandle | null>(null);

  return (
    <div className='verse-select-area'>
      <IconButton>
        <RemoveIcon className='remove-verse-icon'/>
      </IconButton>
      <IconButton>
        <DoubleArrowIcon />
      </IconButton>
      <DropDown
        className='book-select'
        value='Select a Book'
        ref={booksRef}
      >
        <ul>
          <li>Hello World</li>
          <li>Hello World</li>
        </ul>
      </DropDown>
      <DropDown
        className='chapter-select'
        value='1'
        ref={chapterRef}
      >
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </DropDown>
      <p>:</p>
      <DropDown
        className='verse-select'
        value='1'
        ref={chapterRef}
      >
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </DropDown>
      <IconButton>
        <DoubleArrowIcon />
      </IconButton>
      <IconButton>
        <AddIcon className='add-verse-icon'/>
      </IconButton>
    </div>
  )
}

export default VerseSelector