import { configureStore } from '@reduxjs/toolkit'
import parentReducer from '../app/parentSlice'

export default configureStore({
  reducer: {
    parent: parentReducer
  }
})