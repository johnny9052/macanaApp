import { TestBed } from '@angular/core/testing';

import { InsumoFumigacionService } from './insumo-fumigacion.service';

describe('InsumoFumigacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsumoFumigacionService = TestBed.get(InsumoFumigacionService);
    expect(service).toBeTruthy();
  });
});
