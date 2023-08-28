import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { addError } from '../../../app/parentSlice';
import { setBook, setChapter } from '../booksAndChapterSlice';

import { RootState } from '../../../app/store';
import { Book } from '../../../../types/api';

import { useLazyGetBooksQuery, useLazyGetChaptersQuery } from '../../../services/bibleExplored';

import DropDown, { DropDownHandle } from '../../../common/components/dropdown/DropDown';
import Spinner from '../../../common/components/spinner/Spinner';
import NumberGrid from '../../../common/components/numberGrid/NumberGrid';

import './BooksAndChapterNavigator.scss';

function BooksAndChapterNavigator() {
  const dispatch = useDispatch()
  const bibleId = useSelector((state: RootState) => state.booksAndChapter.bibleId);
  const bibleName = useSelector((state: RootState) => state.booksAndChapter.bibleName);
  const isGoPressed = useSelector((state: RootState) => state.booksAndChapter.isGoPressed);
  const bookId = useSelector((state: RootState) => state.booksAndChapter.bookId);
  const bookName = useSelector((state: RootState) => state.booksAndChapter.bookName);
  const chapter = useSelector((state: RootState) => state.booksAndChapter.chapter);
  const [ getBooks, { data: dataBook, isFetching: isFetchingBook }] = useLazyGetBooksQuery(); 
  const [ getChapterLength, {data: dataChapterLength, isFetching: isFetchingChapterLength, isError: isErrorChapterLength }] = useLazyGetChaptersQuery();
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
  useEffect(() => {
    if (bibleId && bookId) {
      getChapterLength({bibleId: bibleId, bookId: bookId})
    }
  }, [bibleId, bookId])
  useEffect(() => {
    if (isErrorChapterLength) {
      dispatch(addError(`Apologies, chapter data from ${bookName} in ${bibleName} could not be fetched right now. Please try a different Book or Bible Version`))
    }
  }, [isErrorChapterLength])

  const handleSelectBook = (book: Book) => {
    dispatch(setBook(book));
    booksRef.current?.toggleDropDown();
  }

  const handleSelectChapter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const dataKey : string | null = target.getAttribute('data-key');
    if (dataKey) {
      const chapterNum = parseInt(dataKey)
      if (!isNaN(chapterNum)) {
        console.log('dispatching action');
        dispatch(setChapter(chapterNum));
      }
    }
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
      { isFetchingChapterLength ? <Spinner /> : (
        (dataChapterLength && !isErrorChapterLength) && (
          <NumberGrid 
            maxValue={dataChapterLength} 
            onSelectCell={handleSelectChapter}
            selectedCell={chapter}
          />
        ) 
      )}
    </div>
  )
}

export default BooksAndChapterNavigator
