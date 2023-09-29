import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBySideComponent } from './side-by-side.component';

describe('SideBySideComponent', () => {
  let component: SideBySideComponent;
  let fixture: ComponentFixture<SideBySideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBySideComponent]
    });
    fixture = TestBed.createComponent(SideBySideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
