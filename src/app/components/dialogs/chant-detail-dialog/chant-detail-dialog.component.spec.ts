import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantDetailDialogComponent } from './chant-detail-dialog.component';

describe('ChantDetailDialogComponent', () => {
  let component: ChantDetailDialogComponent;
  let fixture: ComponentFixture<ChantDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChantDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
