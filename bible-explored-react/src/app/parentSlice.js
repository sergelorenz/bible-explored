import { createSlice } from '@reduxjs/toolkit';

export const parentSlice = createSlice({
  name: 'parent',
  initialState: {
    theme: 'light',
    selectedMenu: 'home'
  },
  reducers: {
    toggleTheme: state => {
      if (state.theme === 'light') {
        state.theme = 'dark'
      } else if (state.theme === 'dark') {
        state.theme = 'light'
      } else {
        console.error(`This theme is currently not implemented.`);
      }
    }
  }
})

export const { toggleTheme } = parentSlice.actions;

export default parentSlice.reducer;