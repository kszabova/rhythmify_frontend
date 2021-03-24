import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantDetailsComponent } from './chant-details.component';

describe('ChantDetailsComponent', () => {
  let component: ChantDetailsComponent;
  let fixture: ComponentFixture<ChantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChantDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
