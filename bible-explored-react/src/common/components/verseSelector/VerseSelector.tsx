import React from 'react'

import IconButton from '../iconButton/IconButton';

import { ReactComponent as RemoveIcon } from '../../../res/icons/remove-icon.svg';

type Props = {
  defaultBook: string,
  defaultChapter: number,
  defaultVerse: number
}

function VerseSelector({defaultBook, defaultChapter, defaultVerse}: Props) {
  return (
    <div className='verse-seleect-area'>
      <IconButton>
        <RemoveIcon />
      </IconButton>
    </div>
  )
}

export default VerseSelector