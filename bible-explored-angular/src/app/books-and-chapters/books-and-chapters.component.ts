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
  bibleSelectorInput: DropdownModel = {
    parentClass: 'bible-select',
    placeholder: 'Select a Bible Version'
  };
  isLoading = {
    bibles: false,
    books: false,
    chapters: false,
    content: false
  }
  isError = {
    bibles: false,
    books: false,
    chapters: false,
    content: false
  }
  bibleVersion: string = '';

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.getBibleVersions();
  }

  getBibleVersions(): void {
    this.isLoading.bibles = true;
    this.bibleService.getBibles().subscribe({
      next: bibleVersions => {
        this.bibleSelectorInput.options = bibleVersions
        this.isLoading.bibles = false;
      },
      error: error => {
        this.isError.bibles = true
        this.isLoading.bibles = false;
      }
    })
  }

  selectBibleVersion(newVersion: string) {
    this.bibleVersion = newVersion;
  }

  loadBooksAndChapters() {

  }
}
