import { TestBed } from '@angular/core/testing';

import { AnimalClassifyerRes } from './animal-classifyer-res';

describe('AnimalClassifyerRes', () => {
  let service: AnimalClassifyerRes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalClassifyerRes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
