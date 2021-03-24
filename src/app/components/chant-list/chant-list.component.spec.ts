import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChantListComponent } from './chant-list.component';

describe('ChantListComponent', () => {
  let component: ChantListComponent;
  let fixture: ComponentFixture<ChantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
