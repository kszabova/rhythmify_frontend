import { TestBed } from '@angular/core/testing';

import { ChantFacadeService } from './chant-facade.service';

describe('ChantFacadeService', () => {
  let service: ChantFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChantFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
