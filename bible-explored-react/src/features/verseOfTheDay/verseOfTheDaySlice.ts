import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Bible } from '../../../types/api';

import { DEFAULT_BIBLE_ID, DEFAULT_BIBLE_NAME } from '../../common/constants';

export const verseOfTheDaySlice = createSlice({
  name: 'verseOfTheDay',
  initialState: {
    bibleName: DEFAULT_BIBLE_NAME,
    bibleId: DEFAULT_BIBLE_ID
  },
  reducers: {
    setBible: (state, action : PayloadAction<Bible>) => {
      const { id, name } = action.payload;
      state.bibleId = id;
      state.bibleName = name;
    },
  }
})

export const { setBible } = verseOfTheDaySlice.actions;

export default verseOfTheDaySlice.reducer;