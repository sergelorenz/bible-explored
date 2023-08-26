import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type setBookPayload = {
  newBook: string,
  numberVerses: number
}


export const booksAndChapterSlice = createSlice({
  name: 'booksAndChapter',
  initialState: {
    book: 'GEN',
    chapter: 1,
  },
  reducers: {
    setBook: (state, action : PayloadAction<setBookPayload>) => {
      const { newBook, numberVerses } = action.payload;
      state.book = newBook;
      state.chapter = 1;
    },
    setChapter: (state, action: PayloadAction<number>) => {
      state.chapter = action.payload;
    },
  }
})