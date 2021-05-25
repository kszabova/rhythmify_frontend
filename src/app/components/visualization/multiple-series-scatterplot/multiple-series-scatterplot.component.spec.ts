import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSeriesScatterplotComponent } from './multiple-series-scatterplot.component';

describe('MultipleSeriesScatterplotComponent', () => {
  let component: MultipleSeriesScatterplotComponent;
  let fixture: ComponentFixture<MultipleSeriesScatterplotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleSeriesScatterplotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSeriesScatterplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
