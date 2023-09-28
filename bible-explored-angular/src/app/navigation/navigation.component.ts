import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  theme: string = '';
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
