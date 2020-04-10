import { TestBed } from '@angular/core/testing';

import { PlanManejoFertilizacionService } from './plan-manejo-fertilizacion.service';

describe('PlanManejoFertilizacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanManejoFertilizacionService = TestBed.get(PlanManejoFertilizacionService);
    expect(service).toBeTruthy();
  });
});
