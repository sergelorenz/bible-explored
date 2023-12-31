import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Bible, Book } from "../../../types/api";

export const booksAndChapterSlice = createSlice({
  name: 'booksAndChapter',
  initialState: {
    bibleId: '',
    isGoPressed: false,
    bibleName: '',
    bookId: '',
    bookName: '',
    bookNameLong: '',
    chapter: 0,
    isViewerInitialized: false
  },
  reducers: {
    setBible: (state, action : PayloadAction<Bible>) => {
      const { id, name } = action.payload;
      state.bibleId = id;
      state.bibleName = name;
      state.isGoPressed = true
    },
    setBook: (state, action : PayloadAction<Book>) => {
      const { id, name, nameLong } = action.payload;
      state.bookId = id;
      state.bookName = name;
      state.bookNameLong = nameLong
      state.chapter = 1;
    },
    setChapter: (state, action: PayloadAction<number>) => {
      state.chapter = action.payload;
    },
    initializeViewer: state => {
      state.isViewerInitialized = true;
    }
  }
})

export const {setBible, setBook, setChapter, initializeViewer} = booksAndChapterSlice.actions;

export default booksAndChapterSlice.reducer;