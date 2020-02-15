import { TestBed } from '@angular/core/testing';

import { ClimatologicoService } from './climatologico.service';

describe('ClimatologicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClimatologicoService = TestBed.get(ClimatologicoService);
    expect(service).toBeTruthy();
  });
});
