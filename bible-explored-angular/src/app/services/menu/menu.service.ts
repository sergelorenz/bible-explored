import { Injectable } from '@angular/core';
import { MenuGroup } from 'src/app/shared/types';
import {
  MENU_HOME,
  MENU_BOOKS_AND_CHAPTERS,
  MENU_VERSE_OF_THE_DAY,
  MENU_SIDE_BY_SIDE
} from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuGroup : MenuGroup = {
    menuHome: MENU_HOME,
    menuBooksAndChapters: MENU_BOOKS_AND_CHAPTERS,
    menuVerseOfTheDay: MENU_VERSE_OF_THE_DAY,
    menuSideBySide: MENU_SIDE_BY_SIDE
  }

  getMenuGroup(): MenuGroup {
    return this.menuGroup
  }

  constructor() { }
}
