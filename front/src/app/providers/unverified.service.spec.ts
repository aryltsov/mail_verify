import { TestBed } from '@angular/core/testing';

import { UnverifiedService } from './unverified.service';

describe('UnverifiedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnverifiedService = TestBed.get(UnverifiedService);
    expect(service).toBeTruthy();
  });
});
