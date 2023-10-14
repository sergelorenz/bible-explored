import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  useAnimation,
  transition
} from '@angular/animations';
import { BibleService } from '../services/bible/bible.service';
import { DropdownComponent, DropdownModel } from '../shared/components/dropdown/dropdown.component';
import { appear, disappear } from '../shared/components/animation';
import { groupBiblesByLanguage } from '../shared/dataHandler';
import { Option } from '../shared/types';

@Component({
  selector: 'app-books-and-chapters',
  animations: [
    trigger('addRemove', [
      transition(':enter', useAnimation(appear, { params: { width: '640px'}})),
      transition(':leave', useAnimation(disappear, { params: {width: '640px'}}))
    ])
  ],
  templateUrl: './books-and-chapters.component.html',
  styleUrls: ['./books-and-chapters.component.scss']
})
export class BooksAndChaptersComponent implements OnInit {
  @ViewChild('selectBook') private dropdownComponent!: DropdownComponent;

  bibleSelectorInput: DropdownModel = {
    parentClass: 'bible-select',
    placeholder: 'Select a Bible Version'
  };
  bookSelectorInput: DropdownModel = {
    parentClass: 'book-select',
    placeholder: 'Select a Book'
  }
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
  isAnimateOpen = {
    bookNavigator: false,
    bibleViewer: false
  }
  bibleVersion?: Option;
  bibleBook?: Option;
  chapterLength?: number;
  isBooksAndChapterInitialized = false;
  isBibleViewerInitialized = false;

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.getBibleVersions();
  }

  selectBibleVersion(newVersion: Option) {
    this.bibleVersion = newVersion;
  }

  selectBibleBook(newBook: Option) {
    this.bibleBook = newBook;
  }

  loadBooksAndChapters() {
    this.isBooksAndChapterInitialized = true;
    this.getBooks();
  }

  getBibleVersions(): void {
    this.isLoading.bibles = true;
    this.bibleService.getBibles().subscribe({
      next: bibleVersions => {
        this.bibleSelectorInput.options = groupBiblesByLanguage(bibleVersions);
        this.isLoading.bibles = false;
      },
      error: error => {
        this.isError.bibles = true
        this.isLoading.bibles = false;
      }
    })
  }

  getBooks(): void {
    if (this.bibleVersion) {
      this.isLoading.books = true;
      this.bibleService.getBooks(this.bibleVersion.id).subscribe({
        next: books => {
          this.bookSelectorInput.options = books.map(book => ({
            id: book.id,
            name: book.name,
            nameLong: book.nameLong
          }))
          this.isLoading.books = false;
          this.dropdownComponent.selectItem(this.bookSelectorInput.options[0])
        },
        error: error => {
          this.isError.books = true;
          this.isLoading.books = false;
        }
      })
    }
  }

  getChapterLength(): void {
    if (this.bibleVersion && this.bibleBook) {
      this.isLoading.chapters = true;
      this.bibleService.getChapterLength({bibleId: this.bibleVersion.id, bookId: this.bibleBook.id}).subscribe({
        next: chapterLength => {
          this.chapterLength = chapterLength,
          this.isLoading.chapters = false;
        },
        error: error => {
          this.isError.chapters = true;
          this.isLoading.chapters = false;
        }
      })
    }
  }
}
