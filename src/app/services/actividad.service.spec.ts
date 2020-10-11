import { TestBed } from '@angular/core/testing';

import { ActividadService } from './actividad.service';

describe('ActividadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActividadService = TestBed.get(ActividadService);
    expect(service).toBeTruthy();
  });
});
