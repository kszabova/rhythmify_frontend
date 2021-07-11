import { TestBed } from '@angular/core/testing';

import { IncipitService } from './incipit.service';

describe('IncipitService', () => {
  let service: IncipitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncipitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
