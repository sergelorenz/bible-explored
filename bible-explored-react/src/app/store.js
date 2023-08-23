import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { bibleExploredApi } from '../services/bibleExplored'
import parentReducer from '../app/parentSlice'

export const store = configureStore({
  reducer: {
    [bibleExploredApi.reducerPath]: bibleExploredApi.reducer,
    parent: parentReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bibleExploredApi.middleware)
})

setupListeners(store.dispatch);