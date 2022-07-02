import { TestBed } from '@angular/core/testing';

import { LoadRestaurantDashboardGuard } from './load-restaurant-dashboard.guard';

describe('LoadRestaurantDashboardGuard', () => {
  let guard: LoadRestaurantDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadRestaurantDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
