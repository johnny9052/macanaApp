import { TestBed } from '@angular/core/testing';

import { RazaVacaService } from './raza-vaca.service';

describe('RazaVacaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RazaVacaService = TestBed.get(RazaVacaService);
    expect(service).toBeTruthy();
  });
});
