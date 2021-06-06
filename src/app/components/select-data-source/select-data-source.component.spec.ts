import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDataSourceComponent } from './select-data-source.component';

describe('SelectDataSourceComponent', () => {
  let component: SelectDataSourceComponent;
  let fixture: ComponentFixture<SelectDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDataSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
