import { TestBed } from '@angular/core/testing';

import { RotacionesService } from './rotaciones.service';

describe('RotacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RotacionesService = TestBed.get(RotacionesService);
    expect(service).toBeTruthy();
  });
});
