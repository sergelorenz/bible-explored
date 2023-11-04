import { Component, Input, Output, ViewEncapsulation, OnInit, EventEmitter, SimpleChanges, HostBinding } from '@angular/core';
import shortUUID, { SUUID } from 'short-uuid';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { groupBiblesByLanguage, htmlToText } from 'src/app/shared/dataHandler';
import { BibleService } from 'src/app/services/bible/bible.service';
import { DropdownModel } from 'src/app/shared/components/dropdown/dropdown.component';
import { VERSE_VIEWER_INITIAL_VERSION, VERSE_VIEWER_INITIAL_VERSION_NAME } from 'src/app/shared/constants';
import { Option, PassageContent, GetPassageRequest } from 'src/app/shared/types';


export type VersionViewerModel = {
  id: string,
  name: string,
  key: SUUID
}


@Component({
  selector: 'app-version-viewer',
  animations: [
    trigger('addRemove', [
      transition(':enter', [
        style({
          opacity: 0,
          width: '0px',
          fontSize: '0.001em'
        }),
        animate('0.3s', style({
          opacity: 1,
          width: '400px',
          fontSize: '1em'
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          width: '400px',
          fontSize: '1em'
        }),
        animate('0.3s', style({
          opacity: 0,
          width: '0px',
          fontSize: '0.001em'
        }))
      ])
    ])
  ],
  host: {
    '[@addRemove]': 'true',
  },
  templateUrl: './version-viewer.component.html',
  styleUrls: ['./version-viewer.component.scss', '../../../styles/generic/scripture-styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VersionViewerComponent implements OnInit {
  @Input() bibleVersion: VersionViewerModel = {
    id: VERSE_VIEWER_INITIAL_VERSION,
    name: VERSE_VIEWER_INITIAL_VERSION_NAME,
    key: shortUUID.generate()
  }
  @Input() passageVerse?: string;
  @Output() handleDeleteVersion = new EventEmitter<VersionViewerModel>();
  @Output() handleUpdateVersion = new EventEmitter<VersionViewerModel>();

  bibleSelectorInput: DropdownModel = {
    parentClass: 'side-by-side-version-selector',
    placeholder: 'Select a Bible Version'
  }
  isLoading = {
    bibles: false,
    content: false
  }
  passageContent?: PassageContent;

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.bibleSelectorInput.placeholder = this.bibleVersion.name;
    this.getBibleVersions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['bibleVersion'] && changes['bibleVersion'].currentValue) || (changes['passageVerse'] && changes['passageVerse'].currentValue)) {
      this.getPassage();
    }
  }

  handleCopyPassage() {
    if (this.passageContent) {
      navigator.clipboard.writeText(htmlToText(this.passageContent.content)).then(() => {
        alert('Successfully copied passage to clipboard');
      })
    }
  }

  selectBibleVersion(newVersion: Option) {
    this.handleUpdateVersion.emit({
      id: newVersion.id,
      name: newVersion.name,
      key: this.bibleVersion.key
    })
  }

  removeVersion() {
    this.handleDeleteVersion.emit(this.bibleVersion);
  }

  getBibleVersions(): void {
    this.isLoading.bibles = true;
    this.bibleService.getBibles().subscribe({
      next: bibleVersions => {
        this.bibleSelectorInput.options = groupBiblesByLanguage(bibleVersions);
        this.isLoading.bibles = false;
      },
      error: error => {
        this.isLoading.bibles = false
      }
    })
  }

  getPassage(): void {
    if (this.passageVerse) {
      let passageRequest: GetPassageRequest = {
        bibleId: this.bibleVersion.id,
        passage: this.passageVerse
      }
      this.isLoading.content = true;
      this.bibleService.getPassage(passageRequest).subscribe({
        next: (passageContent: PassageContent) => {
          this.passageContent = passageContent;
          this.isLoading.content = false;
        },
        error: error => {
          this.isLoading.content = false;
        }
      })
    }
  }
}
