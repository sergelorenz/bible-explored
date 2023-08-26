import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type Bible = {
  bibleId: string,
  bibleName: string
}

export const booksAndChapterSlice = createSlice({
  name: 'booksAndChapter',
  initialState: {
    bibleId: '',
    isGoPressed: false,
    bibleName: '',
    book: '',
    chapter: 1,
  },
  reducers: {
    setBible: (state, action : PayloadAction<Bible>) => {
      const { bibleId, bibleName } = action.payload;
      state.bibleId = bibleId;
      state.bibleName = bibleName;
    },
    setBook: (state, action : PayloadAction<string>) => {
      state.book = action.payload
      state.chapter = 1;
    },
    setChapter: (state, action: PayloadAction<number>) => {
      state.chapter = action.payload;
    },
    pressGo: state => {
      state.isGoPressed = true;
    }
  }
})

export const {setBible, setBook, setChapter, pressGo} = booksAndChapterSlice.actions;

export default booksAndChapterSlice.reducer;