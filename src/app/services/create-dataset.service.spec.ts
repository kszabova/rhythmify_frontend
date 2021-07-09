import { TestBed } from '@angular/core/testing';

import { CreateDatasetService } from './create-dataset.service';

describe('CreateDatasetService', () => {
  let service: CreateDatasetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDatasetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
