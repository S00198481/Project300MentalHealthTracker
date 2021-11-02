import { TestBed } from '@angular/core/testing';

import { AWSService } from './aws.service';

describe('AWSService', () => {
  let service: AWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
