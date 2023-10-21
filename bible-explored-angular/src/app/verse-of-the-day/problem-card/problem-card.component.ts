import { Component, Input } from '@angular/core';
import { Problem } from 'src/app/shared/types';

@Component({
  selector: 'app-problem-card',
  templateUrl: './problem-card.component.html',
  styleUrls: ['./problem-card.component.scss']
})
export class ProblemCardComponent {
  @Input() problemItem: Problem = {
    description: '',
    verses: []
  };
}
