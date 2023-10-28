import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BibleService } from 'src/app/services/bible/bible.service';
import { DropdownModel } from 'src/app/shared/components/dropdown/dropdown.component';


@Component({
  selector: 'app-verse-selector',
  templateUrl: './verse-selector.component.html',
  styleUrls: ['./verse-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerseSelectorComponent implements OnInit {

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {

  }

  handleClickDecreaseVerseCount() {

  }

  handleClickPreviousVerse() {

  }

  handleClickNextVerse() {

  }

  handleClickIncreaseVerseCount() {

  }
}
