import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BibleService } from 'src/app/services/bible/bible.service';
import { DropdownModel } from 'src/app/shared/components/dropdown/dropdown.component';
import { BIBLE_ID_BASIS } from 'src/app/shared/constants';
import { Option } from 'src/app/shared/types';
import { integerToListOption } from 'src/app/shared/dataHandler';

@Component({
  selector: 'app-verse-selector',
  templateUrl: './verse-selector.component.html',
  styleUrls: ['./verse-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerseSelectorComponent implements OnInit {
  bookSelectorInput: DropdownModel = {
    parentClass: 'book-select',
    placeholder: 'Select a Book'
  }
  chapterSelectorInput: DropdownModel = {
    parentClass: 'chapter-select',
    placeholder: '1'
  }
  verseSelectorInput: DropdownModel = {
    parentClass: 'verse-select',
    placeholder: '1'
  }
  isLoading = {
    books: false,
    chapters: false,
    verses: false
  }
  selectedBook: Option = {
    id: 'JHN',
    name: 'John'
  }
  selectedChapter: Option ={
    id: '1',
    name: '1'
  }
  selectedVerse: Option = {
    id: '1',
    name: '1'
  }

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.getBooks();
    this.getChapterLength();
    this.getVerseLength();
  }

  getBooks(): void {
    this.isLoading.books = true;
    this.bibleService.getBooks(BIBLE_ID_BASIS).subscribe({
      next: books => {
        this.bookSelectorInput.options = books.map(book => ({
          id: book.id,
          name: book.name,
          nameLong: book.nameLong
        }))
        this.isLoading.books = false;
      },
      error: error => {
        this.isLoading.books = false;
      }
    })
  }

  getChapterLength(): void {
    if (this.selectedBook) {
      this.isLoading.chapters = true;
      this.bibleService.getChapterLength({bibleId: BIBLE_ID_BASIS, bookId: this.selectedBook.id}).subscribe({
        next: chapterLength => {
          this.chapterSelectorInput.options = integerToListOption(chapterLength);
          this.isLoading.chapters = false;
        },
        error: error => {
          this.isLoading.chapters = false;
        }
      })
    }
  }

  getVerseLength(): void {
    if (this.selectedBook && this.selectedChapter) {
      this.isLoading.verses = true;
      this.bibleService.getVerseLength({bibleId: BIBLE_ID_BASIS, bookId: this.selectedBook.id, chapter: parseInt(this.selectedChapter.id)}).subscribe({
        next: verseLength => {
          this.verseSelectorInput.options = integerToListOption(verseLength);
          this.isLoading.verses = false;
        },
        error: error => {
          this.isLoading.verses = false;
        }
      })
    }
  }

  handleSelectBook(selectedBook: Option) {

  }

  handleSelectChapter(selectedChapter: Option) {

  }

  handleSelectVerse(selectedVerse: Option) {
    
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
