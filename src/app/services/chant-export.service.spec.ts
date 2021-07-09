import { TestBed } from '@angular/core/testing';

import { ChantExportService } from './chant-export.service';

describe('ChantExportService', () => {
  let service: ChantExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChantExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
