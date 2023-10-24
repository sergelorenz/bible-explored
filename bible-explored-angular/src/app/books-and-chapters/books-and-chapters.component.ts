import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  trigger,
  useAnimation,
  transition,
  style,
  animate
} from '@angular/animations';
import { BibleService } from '../services/bible/bible.service';
import { DropdownComponent, DropdownModel } from '../shared/components/dropdown/dropdown.component';
import { groupBiblesByLanguage } from '../shared/dataHandler';
import { ChapterContent, Option } from '../shared/types';


@Component({
  selector: 'app-books-and-chapters',
  animations: [
    trigger('addRemove', [
      transition(':enter', [
        style({
          width: '0px',
          opacity: 0
        }),
        animate('0.2s', style({
          width: '640px',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          width: '640px',
          opacity: 1
        }),
        animate('0.2s', style({
          width: '0px',
          opacity: 0
        }))
      ])
    ])
  ],
  templateUrl: './books-and-chapters.component.html',
  styleUrls: ['./books-and-chapters.component.scss', '../../styles/generic/scripture-styles.scss'],
  encapsulation: ViewEncapsulation.None
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
  bibleVersion?: Option;
  bibleBook?: Option;
  chapterLength?: number;
  selectedChapter?: number;
  bibleContent?: string;
  bibleCopyright?: string;
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
    this.getChapterLength();
  }

  loadBooksAndChapters() {
    this.isBooksAndChapterInitialized = true;
    this.getBooks();
  }

  selectChapter(newChapter: number) {
    this.selectedChapter = newChapter;
    this.isBibleViewerInitialized = true;
    this.getBibleContent();
  }

  getBibleVersions(): void {
    this.isLoading.bibles = true;
    this.bibleService.getBibles().subscribe({
      next: bibleVersions => {
        this.bibleSelectorInput.options = groupBiblesByLanguage(bibleVersions);
        this.isLoading.bibles = false;
      },
      error: error => {
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
          this.getChapterLength();
        },
        error: error => {
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
          this.selectChapter(1);
        },
        error: error => {
          this.isLoading.chapters = false;
        }
      })
    }
  }

  getBibleContent(): void {
    if (this.bibleVersion && this.bibleBook && this.selectedChapter) {
      this.isLoading.content = true;
      this.bibleService.getVerses({bibleId: this.bibleVersion.id, bookId: this.bibleBook.id, chapter: this.selectedChapter}).subscribe({
        next: (chapterContent: ChapterContent) => {
          this.bibleContent = chapterContent.content;
          this.bibleCopyright = chapterContent.copyright;
          this.isLoading.content = false;
        },
        error: error => {
          this.isLoading.chapters = false;
        }
      })
    }
  }
}
