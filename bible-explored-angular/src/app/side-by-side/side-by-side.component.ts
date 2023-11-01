import { Component, OnInit } from '@angular/core';
import { BibleService } from '../services/bible/bible.service';
import { VERSE_VIEWER_LIMIT } from '../shared/constants';
import { ScriptureVerse } from '../shared/types';
import { formPassage } from '../shared/dataHandler';

@Component({
  selector: 'app-side-by-side',
  templateUrl: './side-by-side.component.html',
  styleUrls: ['./side-by-side.component.scss']
})
export class SideBySideComponent implements OnInit {
  verseViewerLimit = VERSE_VIEWER_LIMIT;
  currentScripture?: ScriptureVerse
  passage?: string;
  currentVerseCount = 1;

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {

  }

  enterScripture(scriptureVerse: ScriptureVerse) {
    this.currentScripture = scriptureVerse;
    this.formPassage();
  }

  changeVerseCount(newVerseCount: number) {
    this.currentVerseCount = newVerseCount;
    if (this.currentScripture) {
      this.formPassage();
    }
  }

  changeVerse(newVerse: string) {
    if(this.currentScripture) {
      this.currentScripture.verse = parseInt(newVerse);
      this.formPassage();
    }
  }

  formPassage() {
    if (this.currentScripture) {
      this.passage = formPassage(this.currentScripture.book, this.currentScripture.chapter, this.currentScripture.verse, this.currentVerseCount)
    }

  }

}
