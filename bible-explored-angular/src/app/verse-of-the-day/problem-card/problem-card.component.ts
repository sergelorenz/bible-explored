import { Component, Input } from '@angular/core';
import { BibleService } from 'src/app/services/bible/bible.service';
import { Problem, GetPassageRequest, PassageContent } from 'src/app/shared/types';
import { DEFAULT_BIBLE_ID } from 'src/app/shared/constants';

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
  @Input() bibleVersionId: string = DEFAULT_BIBLE_ID;
  isOpen = false;
  isLoading = false;
  passages?: PassageContent[]

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
        this.passages = passages;
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = true;
      }
    })
  }
}
