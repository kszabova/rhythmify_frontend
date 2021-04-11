import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelodyStackedHistComponent } from './melody-stacked-hist.component';

describe('MelodyStackedHistComponent', () => {
  let component: MelodyStackedHistComponent;
  let fixture: ComponentFixture<MelodyStackedHistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MelodyStackedHistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MelodyStackedHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
