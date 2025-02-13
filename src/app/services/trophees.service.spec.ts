import { TestBed } from '@angular/core/testing';

import { TropheesService } from './trophees.service';

describe('TropheesService', () => {
  let service: TropheesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TropheesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
