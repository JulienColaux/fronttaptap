import { TestBed } from '@angular/core/testing';

import { ProfilPageService } from './profil-page.service';

describe('ProfilPageService', () => {
  let service: ProfilPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
