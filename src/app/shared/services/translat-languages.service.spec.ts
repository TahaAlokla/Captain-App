import { TestBed } from '@angular/core/testing';

import { TranslatLanguagesService } from './translat-languages.service';

describe('TranslatLanguagesService', () => {
  let service: TranslatLanguagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatLanguagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
