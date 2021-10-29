import { TestBed } from '@angular/core/testing';

import { SentimentApiService } from './sentiment-api.service';

describe('SentimentApiService', () => {
  let service: SentimentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
