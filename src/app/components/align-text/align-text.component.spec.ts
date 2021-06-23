import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignTextComponent } from './align-text.component';

describe('AlignTextComponent', () => {
  let component: AlignTextComponent;
  let fixture: ComponentFixture<AlignTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlignTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
