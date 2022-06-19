import { TestBed } from '@angular/core/testing';

import { HomePageProviderService } from './home-page-provider.service';

describe('HomePageProviderService', () => {
  let service: HomePageProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePageProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
