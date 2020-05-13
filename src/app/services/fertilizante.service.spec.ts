import { TestBed } from '@angular/core/testing';

import { FertilizanteService } from './fertilizante.service';

describe('FertilizanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FertilizanteService = TestBed.get(FertilizanteService);
    expect(service).toBeTruthy();
  });
});
