import { TestBed } from '@angular/core/testing';

import { ConservationProfileService } from './conservation-profile.service';

describe('ConservationProfileService', () => {
  let service: ConservationProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConservationProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
