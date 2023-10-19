import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BibleService } from '../services/bible/bible.service';
import { DropdownModel } from '../shared/components/dropdown/dropdown.component';
import { groupBiblesByLanguage, chooseVerseByDate } from '../shared/dataHandler';
import { Option, PassageContent } from '../shared/types';
import { VERSE_OF_THE_DAY_LIST, DEFAULT_BIBLE_ID, DEFAULT_BIBLE_NAME } from '../shared/constants';

type VerseOfTheDayModel = {
  content: string,
  copyright: string,
  reference: string
}

@Component({
  selector: 'app-verse-of-the-day',
  templateUrl: './verse-of-the-day.component.html',
  styleUrls: ['./verse-of-the-day.component.scss', '../../styles/generic/scripture-styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerseOfTheDayComponent implements OnInit {
  bibleSelectorInput: DropdownModel = {
    parentClass: 'bible-select',
    placeholder: DEFAULT_BIBLE_NAME
  }
  isLoading = {
    bibles: false,
    verseOfTheDay: false
  }
  bibleVersion: Option = {
    id: DEFAULT_BIBLE_ID,
    name: DEFAULT_BIBLE_NAME
  }
  verseOfTheDayPassage?: VerseOfTheDayModel;

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.getBibleVersions();
    this.getPassage();
  }

  selectBibleVersion(newVersion: Option) {
    this.bibleVersion = newVersion;
  }

  handleGoChangeBibleVersion() {

  }

  getBibleVersions(): void {
    this.isLoading.bibles = true;
    this.bibleService.getBibles().subscribe({
      next: bibleVersions => {
        this.bibleSelectorInput.options = groupBiblesByLanguage(bibleVersions);
        this.isLoading.bibles = false;
      },
      error: error => {
        this.isLoading.bibles = false;
      }
    })
  }

  getPassage(): void {
    let passageToday = chooseVerseByDate(VERSE_OF_THE_DAY_LIST);
    if (this.bibleVersion && passageToday) {
      this.isLoading.verseOfTheDay = true;
      this.bibleService.getPassage({bibleId: this.bibleVersion.id, passage: passageToday}).subscribe({
        next: (passageContent: PassageContent) => {
          this.verseOfTheDayPassage = {
            content: passageContent.content,
            copyright: passageContent.copyright,
            reference: passageContent.reference
          }
          this.isLoading.verseOfTheDay = false;
        },
        error: error => {
          this.isLoading.verseOfTheDay = false;
        }
      })
    }
  }
}
