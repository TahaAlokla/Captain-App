import { TestBed } from '@angular/core/testing';

import { RegistrationUsersService } from './registration-users.service';

describe('RegistrationUsersService', () => {
  let service: RegistrationUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
