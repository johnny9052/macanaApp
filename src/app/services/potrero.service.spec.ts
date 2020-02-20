import { TestBed } from '@angular/core/testing';

import { PotreroService } from './potrero.service';

describe('PotreroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PotreroService = TestBed.get(PotreroService);
    expect(service).toBeTruthy();
  });
});
