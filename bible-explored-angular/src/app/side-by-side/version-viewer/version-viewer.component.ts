import { Component, Input, Output, ViewEncapsulation, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import shortUUID, { SUUID } from 'short-uuid';
import {
  state,
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { groupBiblesByLanguage } from 'src/app/shared/dataHandler';
import { BibleService } from 'src/app/services/bible/bible.service';
import { DropdownModel } from 'src/app/shared/components/dropdown/dropdown.component';
import { VERSE_VIEWER_INITIAL_VERSION, VERSE_VIEWER_INITIAL_VERSION_NAME } from 'src/app/shared/constants';
import { Option } from 'src/app/shared/types';


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
    '[@addRemove]': 'true'
  },
  templateUrl: './version-viewer.component.html',
  styleUrls: ['./version-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VersionViewerComponent implements OnInit {
  @Input() bibleVersion: VersionViewerModel = {
    id: VERSE_VIEWER_INITIAL_VERSION,
    name: VERSE_VIEWER_INITIAL_VERSION_NAME,
    key: shortUUID.generate()
  }
  @Output() handleDeleteVersion = new EventEmitter<VersionViewerModel>();
  @Output() handleUpdateVersion = new EventEmitter<VersionViewerModel>();

  showAnimation = false;

  bibleSelectorInput: DropdownModel = {
    parentClass: 'side-by-side-version-selector',
    placeholder: 'Select a Bible Version'
  }
  isLoading = {
    bibles: false,
    content: false
  }

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.bibleSelectorInput.placeholder = this.bibleVersion.name;
    this.getBibleVersions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bibleVersion'] && changes['bibleVersion'].currentValue) {
      console.log('New value for bible version triggered');
    }
  }

  selectBibleVersion(newVersion: Option) {
    this.showAnimation = false;
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
}
