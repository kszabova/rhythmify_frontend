import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomableScatterPlotComponent } from './zoomable-scatter-plot.component';

describe('ZoomableScatterPlotComponent', () => {
  let component: ZoomableScatterPlotComponent;
  let fixture: ComponentFixture<ZoomableScatterPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomableScatterPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomableScatterPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
