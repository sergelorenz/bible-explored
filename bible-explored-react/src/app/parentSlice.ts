import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import { MENU_HOME } from '../common/constants';

type ParentSlice = {
  theme: string,
  selectedMenu: string,
  errors: string[]
}

const initialState: ParentSlice = {
  theme: 'light',
  selectedMenu: MENU_HOME,
  errors: [],
}

export const parentSlice = createSlice({
  name: 'parent',
  initialState: initialState,
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
    },
    addError: (state, action : PayloadAction<string>) => {
      state.errors.push(action.payload);
    },
    popError: state => {
      state.errors.shift();
    }
  }
})

export const { 
  toggleTheme, 
  updateMenu, 
  addError, 
  popError, 
} = parentSlice.actions;

export default parentSlice.reducer;