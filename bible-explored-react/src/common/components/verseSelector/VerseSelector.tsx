import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import IconButton from '../iconButton/IconButton';

import { BIBLE_ID_BASIS } from '../../constants';
import DropDown, { DropDownHandle } from '../dropdown/DropDown';
import Spinner from '../spinner/Spinner';

import { ScriptureVerse } from '../../../../types/types';
import { Book } from '../../../../types/api';

import { padNumber } from '../../../utils/dataHandler';

import { addError } from '../../../app/parentSlice';

import { useGetBooksQuery, useLazyGetChaptersQuery, useLazyGetVerseLengthQuery } from '../../../services/bibleExplored';

import { ReactComponent as RemoveIcon } from '../../../res/icons/remove-icon.svg';
import { ReactComponent as DoubleArrowIcon } from '../../../res/icons/double-arrow-right-icon.svg';
import { ReactComponent as AddIcon } from '../../../res/icons/add-icon.svg';

import './VerseSelector.scss';

type Props = {
  defaultScripture: ScriptureVerse,
  onPressGoAction: Function,
  onPressAdjustVerseCountAction: Function,
  onPressAnotherVerseAction: Function,
  verseCount: number,
  verseCountLimit?: number
}

function VerseSelector({
  defaultScripture, 
  onPressGoAction,
  onPressAdjustVerseCountAction,
  onPressAnotherVerseAction,
  verseCount,
  verseCountLimit=3
}: Props) {
  const dispatch = useDispatch()
  const [ selectedBook, setSelectedBook ] = useState(defaultScripture.book);
  const [ selectedBookName, setSelectedBookName ] = useState(defaultScripture.bookName);
  const [ selectedChapter, setSelectedChapter ] = useState(defaultScripture.chapter);
  const [ selectedVerse, setSelectedVerse ] = useState(defaultScripture.verse);
  const [ verseLimit, setVerseLimit ] = useState(999);
  const booksRef = useRef<DropDownHandle | null>(null);
  const chapterRef = useRef<DropDownHandle | null>(null);
  const verseRef = useRef<DropDownHandle | null>(null);
  const { data: dataBooks, isLoading: isLoadingBooks, isError: isErrorBooks } = useGetBooksQuery(BIBLE_ID_BASIS);
  const [ getChapterLength, {data: dataChapterLength, isFetching: isFetchingChapterLength, isError: isErrorChapterLength }] = useLazyGetChaptersQuery();
  const [ getVerseLength, {data: dataVersesLength, isFetching: isFetchingVersesLength, isError: isErrorVersesLength }] = useLazyGetVerseLengthQuery();
  useEffect(() => {
    getChapterLength({bibleId: BIBLE_ID_BASIS, bookId: selectedBook})
    setSelectedChapter(1);
    getVerseLength({bibleId: BIBLE_ID_BASIS, bookId: selectedBook, chapter: selectedChapter})
  }, [selectedBook])
  useEffect(() => {
    getVerseLength({bibleId: BIBLE_ID_BASIS, bookId: selectedBook, chapter: selectedChapter})
    setSelectedVerse(1);
  }, [selectedChapter])
  useEffect(() => {
    if (dataVersesLength) {
      setVerseLimit(dataVersesLength)
    }
  }, [dataVersesLength])
  useEffect(() => {
    console.log(`Verse Limit ${verseLimit}`)
  }, [verseLimit])

  const selectOption = (setter: Function, value: string | number, dropDownRef?: any) => {
    setter(value);
    if (dropDownRef) {
      dropDownRef.current?.toggleDropDown();
    }
  }

  const handlePreviousVerse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedVerse > 1) {
      dispatch(onPressAnotherVerseAction(-1));
      setSelectedVerse(prev => prev - 1);
    }
  }

  const handleNextVerse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedVerse <= verseLimit - 1) {
      dispatch(onPressAnotherVerseAction(1))
      setSelectedVerse(prev => prev + 1)
    }
  }

  const handleIncreaseVerseCount = (e: React.MouseEvent<HTMLDivElement>) => {
    if (verseCount < verseCountLimit) {
      dispatch(onPressAdjustVerseCountAction(verseCount + 1));
    }
  }

  const handleDecreaseVerseCount = (e: React.MouseEvent<HTMLDivElement>) => {
    if (verseCount > 1) {
      dispatch(onPressAdjustVerseCountAction(verseCount - 1));
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
            onClick={() => {
              selectOption(setSelectedBook, book.id, booksRef);
              selectOption(setSelectedBookName, book.name)
            }}
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
            {padNumber(item + 1)}
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
            {padNumber(item + 1)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className='verse-select-area'>
      <IconButton onButtonClick={handleDecreaseVerseCount} tooltip='Decrease Verse Count'>
        <RemoveIcon className='remove-verse-icon'/>
      </IconButton>
      <IconButton onButtonClick={handlePreviousVerse} tooltip='Previous Verse'>
        <DoubleArrowIcon className='previous-verse-icon'/>
      </IconButton>
      <DropDown
        className='book-select'
        value={selectedBookName}
        ref={booksRef}
      >
        {isLoadingBooks && <Spinner />}
        {dataBooks && renderBooks(dataBooks)}
      </DropDown>
      <DropDown
        className='chapter-select'
        value={padNumber(selectedChapter)}
        ref={chapterRef}
      >
        { isFetchingChapterLength && <Spinner />}
        { dataChapterLength && renderChapterList(dataChapterLength)}
      </DropDown>
      <p>:</p>
      <DropDown
        className='verse-select'
        value={padNumber(selectedVerse)}
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
          verse: selectedVerse,
          bookName: selectedBookName
        }))}
      />
      <IconButton onButtonClick={handleNextVerse} tooltip='Next Verse'>
        <DoubleArrowIcon />
      </IconButton>
      <IconButton onButtonClick={handleIncreaseVerseCount} tooltip='Increase Verse Count'>
        <AddIcon className='add-verse-icon'/>
      </IconButton>
    </div>
  )
}

export default VerseSelector