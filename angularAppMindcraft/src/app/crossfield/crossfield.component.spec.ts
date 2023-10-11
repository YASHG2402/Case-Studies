import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossfieldComponent } from './crossfield.component';

describe('CrossfieldComponent', () => {
  let component: CrossfieldComponent;
  let fixture: ComponentFixture<CrossfieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrossfieldComponent]
    });
    fixture = TestBed.createComponent(CrossfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
