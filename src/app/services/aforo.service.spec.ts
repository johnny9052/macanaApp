import { TestBed } from '@angular/core/testing';

import { AforoService } from './aforo.service';

describe('AforoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AforoService = TestBed.get(AforoService);
    expect(service).toBeTruthy();
  });
});
