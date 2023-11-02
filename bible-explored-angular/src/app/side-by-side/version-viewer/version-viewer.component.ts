import { Component, Input, ViewEncapsulation } from '@angular/core';
import shortUUID, { SUUID } from 'short-uuid';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { VERSE_VIEWER_INITIAL_VERSION, VERSE_VIEWER_INITIAL_VERSION_NAME } from 'src/app/shared/constants';


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
  templateUrl: './version-viewer.component.html',
  styleUrls: ['./version-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VersionViewerComponent {
  @Input() bibleVersion: VersionViewerModel = {
    id: VERSE_VIEWER_INITIAL_VERSION,
    name: VERSE_VIEWER_INITIAL_VERSION_NAME,
    key: shortUUID.generate()
  }
}
