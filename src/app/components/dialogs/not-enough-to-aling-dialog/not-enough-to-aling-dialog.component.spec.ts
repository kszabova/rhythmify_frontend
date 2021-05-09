import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEnoughToAlingDialogComponent } from './not-enough-to-aling-dialog.component';

describe('NotEnoughToAlingDialogComponent', () => {
  let component: NotEnoughToAlingDialogComponent;
  let fixture: ComponentFixture<NotEnoughToAlingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotEnoughToAlingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotEnoughToAlingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
