import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services/theme/theme.service';
import {
   MENU_HOME,
   MENU_BOOKS_AND_CHAPTERS,
   MENU_VERSE_OF_THE_DAY,
   MENU_SIDE_BY_SIDE
} from '../shared/constants';
import { MenuGroup } from '../shared/types';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  theme: string = '';
  menuGroup: MenuGroup = {
    menuHome: MENU_HOME,
    menuBooksAndChapters: MENU_BOOKS_AND_CHAPTERS,
    menuVerseOfTheDay: MENU_VERSE_OF_THE_DAY,
    menuSideBySide: MENU_SIDE_BY_SIDE
  }
  private themeSubscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
      this.themeSubscription = this.themeService.getTheme().subscribe(
        theme => this.theme = theme
      )
  }

  ngOnDestroy(): void {
      if (this.themeSubscription) {
        this.themeSubscription.unsubscribe();
      }
  }

  onToggleTheme() {
    this.themeService.toggleTheme();
  }
}
