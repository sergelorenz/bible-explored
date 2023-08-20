import { createSlice } from '@reduxjs/toolkit';

import { MENU_HOME } from '../common/constants';

export const parentSlice = createSlice({
  name: 'parent',
  initialState: {
    theme: 'light',
    selectedMenu: MENU_HOME
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
    },
    updateMenu: state => {
      const hrefArray = window.location.href.split('/');
      const menu = hrefArray[hrefArray.length - 1];
      state.selectedMenu = menu;
    }
  }
})

export const { toggleTheme, updateMenu } = parentSlice.actions;

export default parentSlice.reducer;