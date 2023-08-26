import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'


import { PASSAGE_LENGTH } from "../../common/constants";

type setBookPayload = {
  newBook: string,
  numberVerses: number
}

type setChapterPayload = {
  newChapter: number,
  numberVerses: number
}

export const booksAndChapterSlice = createSlice({
  name: 'booksAndChapter',
  initialState: {
    book: 'GEN',
    chapter: 1,
    currentVerseFrom: 1,
    currentVerseTo: PASSAGE_LENGTH,
    numberVerses: 31
  },
  reducers: {
    setBook: (state, action : PayloadAction<setBookPayload>) => {
      const { newBook, numberVerses } = action.payload;
      state.book = newBook;
      state.chapter = 1;
      state.numberVerses = numberVerses;
    },
    setChapter: (state, action: PayloadAction<setChapterPayload>) => {
      const { newChapter, numberVerses } = action.payload;
      state.chapter = newChapter;
      state.numberVerses = numberVerses;
    },
    nextPage: state => {
      let checkNewVerseFrom = state.currentVerseTo + 1;
      if (checkNewVerseFrom > state.numberVerses) {

      }
    }
  }
})