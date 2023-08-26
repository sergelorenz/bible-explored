import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

import { RootState } from '../../../app/store';
import { Book } from '../../../../types/api';

import { useLazyGetBooksQuery } from '../../../services/bibleExplored';

import { useLazyFums } from '../../../common/hooks/useLazyFums';

import DropDown, { DropDownHandle } from '../../../common/components/dropdown/DropDown';
import Spinner from '../../../common/components/spinner/Spinner';

import './BooksAndChapterNavigator.scss';

function BooksAndChapterNavigator() {
  const bibleId = useSelector((state: RootState) => state.booksAndChapter.bibleId);
  const isGoPressed = useSelector((state: RootState) => state.booksAndChapter.isGoPressed);
  const book = useSelector((state: RootState) => state.booksAndChapter.book);
  const chapter = useSelector((state: RootState) => state.booksAndChapter.chapter);
  const [ getBooks, { data: dataBook, isLoading: isLoadingBook }] = useLazyFums(useLazyGetBooksQuery);
  useEffect(() => {
    if (bibleId && isGoPressed) {
      getBooks(bibleId)
    }
  }, [bibleId, isGoPressed])
  const booksRef = useRef<DropDownHandle | null>(null);

  const renderBooks = (books: Book[]) => {
    return (
      books.map(book => (
        <div className='book-name' key={book.id}>
          {book.name}
        </div>
      ))
    )
  }

  return (
    <div className='books-and-chapter-navigator'>
      <h1>Search Books and Chapters</h1>
      <DropDown
        className='book-select'
        value={book ? book : 'Select a Book'}
        ref={booksRef}
      >
        {isLoadingBook && <Spinner />}
        {dataBook && renderBooks(dataBook)}
      </DropDown>
    </div>
  )
}

export default BooksAndChapterNavigator
