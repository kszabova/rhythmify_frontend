import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameOnCreateDatasetComponent } from './name-on-create-dataset.component';

describe('NameOnCreateDatasetComponent', () => {
  let component: NameOnCreateDatasetComponent;
  let fixture: ComponentFixture<NameOnCreateDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameOnCreateDatasetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameOnCreateDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
