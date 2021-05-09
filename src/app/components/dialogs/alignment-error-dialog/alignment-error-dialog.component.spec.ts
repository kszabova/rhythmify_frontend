import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentErrorDialogComponent } from './alignment-error-dialog.component';

describe('AlignmentErrorDialogComponent', () => {
  let component: AlignmentErrorDialogComponent;
  let fixture: ComponentFixture<AlignmentErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlignmentErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
