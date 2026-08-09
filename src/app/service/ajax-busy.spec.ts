import { TestBed } from '@angular/core/testing';

import { AjaxBusy } from './ajax-busy';

describe('AjaxBusy', () => {
  let service: AjaxBusy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxBusy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
