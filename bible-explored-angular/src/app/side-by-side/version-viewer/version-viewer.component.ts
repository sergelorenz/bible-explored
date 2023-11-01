import { Component, Input } from '@angular/core';
import { VERSE_VIEWER_INITIAL_VERSION, VERSE_VIEWER_INITIAL_VERSION_NAME } from 'src/app/shared/constants';


export type VersionViewerModel = {
  id: string,
  name: string
}


@Component({
  selector: 'app-version-viewer',
  templateUrl: './version-viewer.component.html',
  styleUrls: ['./version-viewer.component.scss']
})
export class VersionViewerComponent {
  @Input() bibleVersion: VersionViewerModel = {
    id: VERSE_VIEWER_INITIAL_VERSION,
    name: VERSE_VIEWER_INITIAL_VERSION_NAME
  }
}
