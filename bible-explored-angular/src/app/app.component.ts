import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Bible Explored Angular'
  theme: string = '';
  private themeSubscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.getTheme().subscribe(
      theme => this.theme = theme
    );
  }

  ngOnDestroy(): void {
      if (this.themeSubscription) {
        this.themeSubscription.unsubscribe();
      }
  }
}
