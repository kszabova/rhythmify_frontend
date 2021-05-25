import { TestBed } from '@angular/core/testing';

import { CsvTranslateService } from './csv-translate.service';

describe('CsvTranslateService', () => {
  let service: CsvTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
