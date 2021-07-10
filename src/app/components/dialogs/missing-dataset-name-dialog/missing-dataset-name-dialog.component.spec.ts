import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingDatasetNameDialogComponent } from './missing-dataset-name-dialog.component';

describe('MissingDatasetNameDialogComponent', () => {
  let component: MissingDatasetNameDialogComponent;
  let fixture: ComponentFixture<MissingDatasetNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingDatasetNameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingDatasetNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
