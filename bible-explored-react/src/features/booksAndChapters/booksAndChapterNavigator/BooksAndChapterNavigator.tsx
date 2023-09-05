import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { addError } from '../../../app/parentSlice';
import { setBook, setChapter, initializeViewer } from '../booksAndChapterSlice';

import { RootState } from '../../../app/store';
import { Book } from '../../../../types/api';

import { useLazyGetBooksQuery, useLazyGetChaptersQuery } from '../../../services/bibleExplored';

import AppearAnimate from '../../../common/components/appearAnimate/AppearAnimate';
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
  const isViewerInitialized = useSelector((state: RootState) => state.booksAndChapter.isViewerInitialized);
  const [ getBooks, { data: dataBook, isFetching: isFetchingBook, isError: isErrorBook }] = useLazyGetBooksQuery(); 
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
    if (isFetchingChapterLength) {
      dispatch(setChapter(0));
    }
  }, [isFetchingChapterLength])
  useEffect(() => {
    if (dataChapterLength) {
      dispatch(setChapter(1));
    }
  }, [dataChapterLength])
  useEffect(() => {
    if (chapter > 0 && !isViewerInitialized) {
      dispatch(initializeViewer());
    }
  }, [chapter])
  useEffect(() => {
    if (isErrorChapterLength) {
      dispatch(addError(`Apologies, chapter data from ${bookName} in ${bibleName} could not be fetched right now. Please try a different Book or Bible Version`))
    }
    if (isErrorBook) {
      dispatch(addError(`Apologie, Books Data from ${bibleName} could not be fetched right now. Please try a different Bible Version`))
    }
  }, [isErrorChapterLength, isErrorBook])

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
        dispatch(setChapter(chapterNum));
        dispatch(initializeViewer());
      }
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
            onClick={() => handleSelectBook(book)}
          >
            {book.name}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <AppearAnimate styleAppear={{width: '640px', opacity: 1}}>
      <div className='books-and-chapter-navigator'>
        <h2 data-cy='menu-title'>Search Books and Chapters</h2>
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
        { isFetchingChapterLength ? <Spinner className={'number-grid-spinner'} width={'100px'}/> : (
          (dataChapterLength && !isErrorChapterLength) && (
            <NumberGrid 
              maxValue={dataChapterLength} 
              onSelectCell={handleSelectChapter}
              selectedCell={chapter}
            />
          ) 
        )}
      </div>
    </AppearAnimate>
  )
}

export default BooksAndChapterNavigator
