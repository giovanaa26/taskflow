import { TestBed } from '@angular/core/testing';

import { Native } from './native';

describe('Native', () => {
  let service: Native;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Native);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
