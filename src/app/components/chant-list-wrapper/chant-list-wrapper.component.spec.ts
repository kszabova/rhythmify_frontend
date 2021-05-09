import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantListWrapperComponent } from './chant-list-wrapper.component';

describe('ChantListWrapperComponent', () => {
  let component: ChantListWrapperComponent;
  let fixture: ComponentFixture<ChantListWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChantListWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
