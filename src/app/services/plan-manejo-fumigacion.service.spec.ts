import { TestBed } from '@angular/core/testing';

import { PlanManejoFumigacionService } from './plan-manejo-fumigacion.service';

describe('PlanManejoFumigacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanManejoFumigacionService = TestBed.get(PlanManejoFumigacionService);
    expect(service).toBeTruthy();
  });
});
