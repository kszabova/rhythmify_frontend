import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantFetchComponent } from './chant-fetch.component';

describe('ChantFetchComponent', () => {
  let component: ChantFetchComponent;
  let fixture: ComponentFixture<ChantFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChantFetchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
