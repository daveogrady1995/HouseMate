import { TestBed, inject } from '@angular/core/testing';

import { DaftService } from './daft.service';

describe('DaftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaftService]
    });
  });

  it('should be created', inject([DaftService], (service: DaftService) => {
    expect(service).toBeTruthy();
  }));
});
