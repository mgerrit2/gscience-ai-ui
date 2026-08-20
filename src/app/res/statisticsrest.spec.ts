import { TestBed } from '@angular/core/testing';

import { Statisticsrest } from './statisticsrest';

describe('Statisticsrest', () => {
  let service: Statisticsrest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Statisticsrest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
