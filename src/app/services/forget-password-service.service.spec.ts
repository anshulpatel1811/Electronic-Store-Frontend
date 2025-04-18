import { TestBed } from '@angular/core/testing';

import { ForgetPasswordServiceService } from './forget-password-service.service';

describe('ForgetPasswordServiceService', () => {
  let service: ForgetPasswordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetPasswordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
