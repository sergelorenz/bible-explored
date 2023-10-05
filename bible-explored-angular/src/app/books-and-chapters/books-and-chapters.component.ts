import { Component, OnInit } from '@angular/core';
import { BibleService } from '../services/bible/bible.service';
import { GroupOption } from '../shared/types';
import { DropdownModel } from '../shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-books-and-chapters',
  templateUrl: './books-and-chapters.component.html',
  styleUrls: ['./books-and-chapters.component.scss']
})
export class BooksAndChaptersComponent implements OnInit{
  bibleSelectorInput: DropdownModel = {};

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.getBibleVersions();
  }

  getBibleVersions(): void {
    this.bibleService.getBibles()
      .subscribe(bibleVersions => this.bibleSelectorInput.options = bibleVersions)
  }
}
