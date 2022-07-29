import { TestBed } from '@angular/core/testing';

import { RestaurantDashboardService } from './restaurant-dashboard.service';

describe('RestaurantDashboardService', () => {
  let service: RestaurantDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
