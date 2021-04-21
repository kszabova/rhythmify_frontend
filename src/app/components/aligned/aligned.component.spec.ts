import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignedComponent } from './aligned.component';

describe('AlignedComponent', () => {
  let component: AlignedComponent;
  let fixture: ComponentFixture<AlignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
