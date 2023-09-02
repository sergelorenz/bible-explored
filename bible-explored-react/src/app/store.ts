import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { bibleExploredApi } from '../services/bibleExplored'
import parentReducer from './parentSlice'
import booksAndChapterReducer from '../features/booksAndChapters/booksAndChapterSlice';
import verseOfTheDayReducer from '../features/verseOfTheDay/verseOfTheDaySlice';

export const store = configureStore({
  reducer: {
    [bibleExploredApi.reducerPath]: bibleExploredApi.reducer,
    parent: parentReducer,
    booksAndChapter: booksAndChapterReducer,
    verseOfTheDay: verseOfTheDayReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bibleExploredApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);