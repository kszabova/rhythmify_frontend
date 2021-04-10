import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelodyLengthHistComponent } from './melody-length-hist.component';

describe('MelodyLengthHistComponent', () => {
  let component: MelodyLengthHistComponent;
  let fixture: ComponentFixture<MelodyLengthHistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MelodyLengthHistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MelodyLengthHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
