import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import IconButton from '../iconButton/IconButton';

import { BIBLE_ID_BASIS } from '../../constants';
import DropDown, { DropDownHandle } from '../dropdown/DropDown';
import Spinner from '../spinner/Spinner';

import { ScriptureVerse } from '../../../../types/types';
import { Book } from '../../../../types/api';

import { useGetBooksQuery, useLazyGetChaptersQuery, useLazyGetVerseLengthQuery } from '../../../services/bibleExplored';

import { ReactComponent as RemoveIcon } from '../../../res/icons/remove-icon.svg';
import { ReactComponent as DoubleArrowIcon } from '../../../res/icons/double-arrow-right-icon.svg';
import { ReactComponent as AddIcon } from '../../../res/icons/add-icon.svg';

import './VerseSelector.scss';

type Props = {
  defaultScripture: ScriptureVerse,
  onPressGoAction: Function
}

function VerseSelector({defaultScripture, onPressGoAction}: Props) {
  const dispatch = useDispatch()
  const [ selectedBook, setSelectedBook ] = useState(defaultScripture.book);
  const [ selectedChapter, setSelectedChapter ] = useState(defaultScripture.chapter);
  const [ selectedVerse, setSelectedVerse ] = useState(defaultScripture.verse);
  const booksRef = useRef<DropDownHandle | null>(null);
  const chapterRef = useRef<DropDownHandle | null>(null);
  const verseRef = useRef<DropDownHandle | null>(null);
  const { data: dataBooks, isLoading: isLoadingBooks, isError: isErrorBooks } = useGetBooksQuery(BIBLE_ID_BASIS);
  const [ getChapterLength, {data: dataChapterLength, isFetching: isFetchingChapterLength, isError: isErrorChapterLength }] = useLazyGetChaptersQuery();
  const [ getVerseLength, {data: dataVersesLength, isFetching: isFetchingVersesLength, isError: isErrorVersesLength }] = useLazyGetVerseLengthQuery();
  useEffect(() => {
    getChapterLength({bibleId: BIBLE_ID_BASIS, bookId: selectedBook})
    getVerseLength({bibleId: BIBLE_ID_BASIS, bookId: selectedBook, chapter: selectedChapter})
  }, [])

  const selectOption = (setter: Function, value: string | number, dropDownRef: any) => {
    setter(value);
    if (dropDownRef) {
      dropDownRef.current?.toggleDropDown();
    }
  }


  const renderBooks = (books: Book[]) => {
    return (
      <ul>
        {books.map(book => (
          <li 
            className='book-name' 
            data-cy={book.name}
            key={book.id} 
            onClick={() => selectOption(setSelectedBook, book.id, booksRef)}
          >
            {book.name}
          </li>
        ))}
      </ul>
    )
  }
  
  const renderChapterList = (numberChapters: number) => {
    return (
      <ul>
        {[...Array(numberChapters).keys()].map(item => (
          <li
            className='chapter-option'
            data-cy={`Chapter ${item + 1}`}
            key={item + 1}
            onClick={() => selectOption(setSelectedChapter, item + 1, chapterRef)}
          >
            {(item + 1).toString().padStart(2, '0')}
          </li>
        ))}
      </ul>
    )
  }

  const renderVerseList = (numberVerses: number) => {
    return (
      <ul>
        {[...Array(numberVerses).keys()].map(item => (
          <li
            className='verse-option'
            data-cy={`Verse ${item + 1}`}
            key={item + 1}
            onClick={() => selectOption(setSelectedVerse, item + 1, verseRef)}
          >
            {(item + 1).toString().padStart(2, '0')}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className='verse-select-area'>
      <IconButton>
        <RemoveIcon className='remove-verse-icon'/>
      </IconButton>
      <IconButton>
        <DoubleArrowIcon className='previous-verse-icon'/>
      </IconButton>
      <DropDown
        className='book-select'
        value='Select a Book'
        ref={booksRef}
      >
        {isLoadingBooks && <Spinner />}
        {dataBooks && renderBooks(dataBooks)}
      </DropDown>
      <DropDown
        className='chapter-select'
        value='1'
        ref={chapterRef}
      >
        { isFetchingChapterLength && <Spinner />}
        { dataChapterLength && renderChapterList(dataChapterLength)}
      </DropDown>
      <p>:</p>
      <DropDown
        className='verse-select'
        value='1'
        ref={verseRef}
      >
        { isFetchingVersesLength && <Spinner />}
        { dataVersesLength && renderVerseList(dataVersesLength)}
      </DropDown>
      <input 
        data-cy='select-verse-go' 
        type='button'
        value='GO'
        onClick={() => dispatch(onPressGoAction({
          book: selectedBook,
          chapter: selectedChapter,
          verse: selectedVerse
        }))}
      />
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