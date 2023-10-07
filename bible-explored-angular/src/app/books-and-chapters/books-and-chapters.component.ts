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
  isLoadingBibles: boolean = false;
  isErrorBibles: boolean = false;
  bibleVersion: string = '';

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.getBibleVersions();
  }

  getBibleVersions(): void {
    this.isLoadingBibles = true;
    this.bibleService.getBibles().subscribe({
      next: bibleVersions => {
        this.bibleSelectorInput.options = bibleVersions
        this.isLoadingBibles = false        
      },
      error: error => {
        this.isErrorBibles = true
        this.isLoadingBibles = false;
      }
    })
  }

  selectBibleVersion(newVersion: string) {
    this.bibleVersion = newVersion;
  }

  loadBooksAndChapters() {

  }
}
