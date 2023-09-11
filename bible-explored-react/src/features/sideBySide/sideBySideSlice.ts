import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ScriptureVerse } from '../../../types/types';

export const sideBySideSlice = createSlice({
  name: 'sideBySide',
  initialState: {
    bookId: 'JHN',
    chapter: 1,
    verse: 1,
    verseCount: 1
  },
  reducers: {
    setScripture: (state, action : PayloadAction<ScriptureVerse>) => {
      const { book, chapter, verse } = action.payload;
      state.bookId = book;
      state.chapter = chapter;
      state.verse = verse;
    },
    setVerseCount: (state, action : PayloadAction<number>) => {
      const count = action.payload;
      state.verseCount = count;
    },
    goAnotherVerse: (state, action : PayloadAction<number>) => {
      const incrementor = action.payload;
      state.verse = state.verse + incrementor;
    }
  }
})

export const { setScripture, setVerseCount, goAnotherVerse } = sideBySideSlice.actions;

export default sideBySideSlice.reducer;