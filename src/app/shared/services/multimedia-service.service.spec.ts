import { TestBed } from '@angular/core/testing';

import { MultimediaService } from './multimedia-service.service';

describe('MultimediaServiceService', () => {
  let service: MultimediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultimediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
