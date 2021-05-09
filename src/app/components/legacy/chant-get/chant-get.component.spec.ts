import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantGetComponent } from './chant-get.component';

describe('ChantGetComponent', () => {
  let component: ChantGetComponent;
  let fixture: ComponentFixture<ChantGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChantGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
