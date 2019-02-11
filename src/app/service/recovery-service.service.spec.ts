import { TestBed } from '@angular/core/testing';

import { RecoveryServiceService } from './recovery-service.service';

describe('RecoveryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecoveryServiceService = TestBed.get(RecoveryServiceService);
    expect(service).toBeTruthy();
  });
});
