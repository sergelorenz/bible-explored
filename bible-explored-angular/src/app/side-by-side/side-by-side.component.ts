import { Component, OnInit } from '@angular/core';
import shortUUID from 'short-uuid';
import { BibleService } from '../services/bible/bible.service';
import { 
  VERSE_VIEWER_LIMIT, 
  VERSE_LIMIT, 
  VERSE_VIEWER_INITIAL_VERSION, 
  VERSE_VIEWER_INITIAL_VERSION_NAME 
} from '../shared/constants';
import { ScriptureVerse } from '../shared/types';
import { formPassage } from '../shared/dataHandler';
import { VersionViewerModel } from './version-viewer/version-viewer.component';

@Component({
  selector: 'app-side-by-side',
  templateUrl: './side-by-side.component.html',
  styleUrls: ['./side-by-side.component.scss']
})
export class SideBySideComponent implements OnInit {
  verseLimit = VERSE_LIMIT;
  verseViewerLimit = VERSE_VIEWER_LIMIT;
  currentScripture?: ScriptureVerse
  passage?: string;
  currentVerseCount = 1;
  verseViewerList: VersionViewerModel[] = [
    {
      id: VERSE_VIEWER_INITIAL_VERSION,
      name: VERSE_VIEWER_INITIAL_VERSION_NAME,
      key: shortUUID.generate()
    }
  ]

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {

  }

  addVersion() {
    this.verseViewerList.push({
      id: VERSE_VIEWER_INITIAL_VERSION,
      name: VERSE_VIEWER_INITIAL_VERSION_NAME,
      key: shortUUID.generate()
    })
  }

  updateVersion(newVersion: VersionViewerModel) {
    var updateIndex = this.verseViewerList.findIndex(element => element.key === newVersion.key);
    this.verseViewerList[updateIndex] = newVersion;
  }

  removeVersion(version: VersionViewerModel) {
    if (this.verseViewerList.length > 1) {
      var removeIndex =  this.verseViewerList.findIndex(element => element.key === version.key);
      this.verseViewerList.splice(removeIndex, 1);
    }
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
