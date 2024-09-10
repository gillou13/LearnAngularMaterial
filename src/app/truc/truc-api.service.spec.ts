import { TestBed } from '@angular/core/testing';

import { TrucApiService } from './truc-api.service';

describe('TrucApiService', () => {
  let service: TrucApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrucApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
