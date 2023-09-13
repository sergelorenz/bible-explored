import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import shortUUID from 'short-uuid';

import { ScriptureVerse } from '../../../types/types';

import { VERSE_VIEWER_INITIAL_VERSION, VERSE_VIEWER_LIMIT } from '../../common/constants';

type UpdatePayload = {
  index: number,
  newVersion: string
}

export const sideBySideSlice = createSlice({
  name: 'sideBySide',
  initialState: {
    bookId: 'JHN',
    bookName: 'John',
    chapter: 1,
    verse: 1,
    verseCount: 1,
    verseViewerList: [VERSE_VIEWER_INITIAL_VERSION],
    verseViewerKeys: [shortUUID.generate()]
  },
  reducers: {
    setScripture: (state, action : PayloadAction<ScriptureVerse>) => {
      const { book, chapter, verse, bookName } = action.payload;
      state.bookId = book;
      state.chapter = chapter;
      state.verse = verse;
      state.bookName = bookName;
    },
    setVerseCount: (state, action : PayloadAction<number>) => {
      const count = action.payload;
      state.verseCount = count;
    },
    goAnotherVerse: (state, action : PayloadAction<number>) => {
      const incrementor = action.payload;
      state.verse = state.verse + incrementor;
    },
    addVersion: state => {
      if (state.verseViewerList.length <= VERSE_VIEWER_LIMIT - 1) {
        state.verseViewerList.push(VERSE_VIEWER_INITIAL_VERSION);
        state.verseViewerKeys.push(shortUUID.generate());
      }
    },
    removeVersion: (state, action: PayloadAction<number>) => {
      if (state.verseViewerList.length >= 2) {
        const index = action.payload;
        state.verseViewerList.splice(index, 1);
        state.verseViewerKeys.splice(index, 1);
      }
    },
    updateVersion: (state, action: PayloadAction<UpdatePayload>) => {
      const { index, newVersion } = action.payload;
      state.verseViewerList[index] = newVersion;
    }
  }
})

export const { setScripture, setVerseCount, goAnotherVerse, addVersion, removeVersion, updateVersion } = sideBySideSlice.actions;

export default sideBySideSlice.reducer;