import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformarrayComponent } from './dynamicformarray.component';

describe('DynamicformarrayComponent', () => {
  let component: DynamicformarrayComponent;
  let fixture: ComponentFixture<DynamicformarrayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicformarrayComponent]
    });
    fixture = TestBed.createComponent(DynamicformarrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
