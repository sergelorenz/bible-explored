import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAndChaptersComponent } from './books-and-chapters.component';

describe('BooksAndChaptersComponent', () => {
  let component: BooksAndChaptersComponent;
  let fixture: ComponentFixture<BooksAndChaptersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksAndChaptersComponent]
    });
    fixture = TestBed.createComponent(BooksAndChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
