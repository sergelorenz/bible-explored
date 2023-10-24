import { Component, Input, ViewEncapsulation } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { BibleService } from 'src/app/services/bible/bible.service';
import { Problem, GetPassageRequest, PassageContent } from 'src/app/shared/types';
import { addReference } from 'src/app/shared/dataHandler';
import { DEFAULT_BIBLE_ID } from 'src/app/shared/constants';

@Component({
  selector: 'app-problem-card',
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scaleY(0)',
          lineHeight: '0px',
          fontSize: '0px'
        }),
        animate('0.3s', style({
          opacity: 1,
          transform: 'scaleY(1)',
          lineHeight: '25px',
          fontSize: '16px'
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scaleY(1)',
          lineHeight: '25px',
          fontSize: '16px'
        }),
        animate('0.3s', style({
          opacity: 0,
          transform: 'scaleY(0)',
          lineHeight: '0px',
          fontSize: '0px'
        }))
      ])
    ])
  ],
  templateUrl: './problem-card.component.html',
  styleUrls: ['./problem-card.component.scss', '../../../styles/generic/scripture-styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProblemCardComponent {
  @Input() problemItem: Problem = {
    description: '',
    verses: []
  };
  @Input() bibleVersionId: string = DEFAULT_BIBLE_ID;
  isOpen = false;
  isLoading = false;
  passages?: string[]

  constructor(private bibleService: BibleService) {}

  toggleOpenPassage() {
    if (!this.isOpen) {
      this.getPassages()
    }
    this.isOpen = !this.isOpen;
  }

  getPassages() {
    let passageRequests: GetPassageRequest[] = this.problemItem.verses.map(verse => ({
      bibleId: this.bibleVersionId,
      passage: verse
    }))
    this.isLoading = true;
    this.bibleService.getPassages(passageRequests).subscribe({
      next: (passages: PassageContent[]) => {
        this.passages = passages.map((passage: PassageContent) => addReference(passage))
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = true;
      }
    })
  }
}
