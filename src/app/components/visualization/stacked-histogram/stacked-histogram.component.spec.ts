import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedHistogramComponent } from './stacked-histogram.component';

describe('StackedHistogramComponent', () => {
  let component: StackedHistogramComponent;
  let fixture: ComponentFixture<StackedHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedHistogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
