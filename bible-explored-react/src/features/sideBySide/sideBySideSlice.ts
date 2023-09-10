import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ScriptureVerse } from '../../../types/types';

export const sideBySideSlice = createSlice({
  name: 'sideBySide',
  initialState: {
    bookId: 'JHN',
    chapter: 1,
    verse: 1
  },
  reducers: {
    setScripture: (state, action : PayloadAction<ScriptureVerse>) => {
      const { book, chapter, verse } = action.payload;
      state.bookId = book;
      state.chapter = chapter;
      state.verse = verse;
    }
  }
})

export const { setScripture } = sideBySideSlice.actions;

export default sideBySideSlice.reducer;