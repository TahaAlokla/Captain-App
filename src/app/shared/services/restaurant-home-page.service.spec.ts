import { TestBed } from '@angular/core/testing';

import { RestaurantHomePageService } from './restaurant-home-page.service';

describe('RestaurantHomePageService', () => {
  let service: RestaurantHomePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantHomePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
