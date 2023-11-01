import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseViewerComponent } from './verse-viewer.component';

describe('VerseViewerComponent', () => {
  let component: VerseViewerComponent;
  let fixture: ComponentFixture<VerseViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerseViewerComponent]
    });
    fixture = TestBed.createComponent(VerseViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
