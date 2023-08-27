import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { setBook } from '../booksAndChapterSlice';

import { RootState } from '../../../app/store';
import { Book } from '../../../../types/api';

import { useLazyGetBooksQuery } from '../../../services/bibleExplored';

import DropDown, { DropDownHandle } from '../../../common/components/dropdown/DropDown';
import Spinner from '../../../common/components/spinner/Spinner';

import './BooksAndChapterNavigator.scss';

function BooksAndChapterNavigator() {
  const dispatch = useDispatch()
  const bibleId = useSelector((state: RootState) => state.booksAndChapter.bibleId);
  const isGoPressed = useSelector((state: RootState) => state.booksAndChapter.isGoPressed);
  const bookName = useSelector((state: RootState) => state.booksAndChapter.bookName);
  const chapter = useSelector((state: RootState) => state.booksAndChapter.chapter);
  const [ getBooks, { data: dataBook, isFetching: isFetchingBook }] = useLazyGetBooksQuery(); 
  useEffect(() => {
    if (bibleId && isGoPressed) {
      getBooks(bibleId, isGoPressed)
    }
  }, [bibleId, isGoPressed])
  const booksRef = useRef<DropDownHandle | null>(null);
  useEffect(() => {
    if (dataBook) {
      const { id, name, nameLong } = dataBook[0];
      dispatch(setBook({id: id, name: name, nameLong: nameLong}))
    }
  }, [dataBook])

  const handleSelectBook = (book: Book) => {
    dispatch(setBook(book));
    booksRef.current?.toggleDropDown();
  }

  const renderBooks = (books: Book[]) => {
    return (
      <ul>
        {books.map(book => (
          <li 
            className='book-name' 
            key={book.id} 
            onClick={() => handleSelectBook(book)}
          >
            {book.name}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className='books-and-chapter-navigator'>
      <h1>Search Books and Chapters</h1>
      <DropDown
        className='book-select'
        value={bookName ? bookName : 'Select a Book'}
        ref={booksRef}
        isDisabled={!isGoPressed}
      >
        {isFetchingBook ? <Spinner /> : (
          dataBook && renderBooks(dataBook)
        )}
      </DropDown>
    </div>
  )
}

export default BooksAndChapterNavigator
