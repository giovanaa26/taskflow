import { TestBed } from '@angular/core/testing';

import { FirestoreTarefas } from './firestore-tarefas';

describe('FirestoreTarefas', () => {
  let service: FirestoreTarefas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreTarefas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
