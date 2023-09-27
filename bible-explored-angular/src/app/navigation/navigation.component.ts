import { Component } from '@angular/core';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(private themeService: ThemeService) {}

  onToggleTheme() {
    this.themeService.toggleTheme();
  }
}
