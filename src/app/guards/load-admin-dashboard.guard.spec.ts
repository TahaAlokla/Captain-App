import { TestBed } from '@angular/core/testing';

import { LoadAdminDashboardGuard } from './load-admin-dashboard.guard';

describe('LoadAdminDashboardGuard', () => {
  let guard: LoadAdminDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadAdminDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
