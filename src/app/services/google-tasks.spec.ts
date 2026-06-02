import { TestBed } from '@angular/core/testing';

import { GoogleTasks } from './google-tasks';

describe('GoogleTasks', () => {
  let service: GoogleTasks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleTasks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
