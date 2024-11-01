import { TestBed } from '@angular/core/testing';

import { ScannerServiceTsService } from './scanner.service.ts.service';

describe('ScannerServiceTsService', () => {
  let service: ScannerServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScannerServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
