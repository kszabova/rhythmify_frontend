import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetCreatedDialogComponent } from './dataset-created-dialog.component';

describe('DatasetCreatedDialogComponent', () => {
  let component: DatasetCreatedDialogComponent;
  let fixture: ComponentFixture<DatasetCreatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetCreatedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetCreatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
