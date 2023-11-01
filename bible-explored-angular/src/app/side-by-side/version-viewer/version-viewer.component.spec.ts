import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionViewerComponent } from './version-viewer.component';

describe('VersionViewerComponent', () => {
  let component: VersionViewerComponent;
  let fixture: ComponentFixture<VersionViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewerComponent]
    });
    fixture = TestBed.createComponent(VersionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
