import { TestBed } from '@angular/core/testing';

import { VacasService } from './vacas.service';

describe('VacasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacasService = TestBed.get(VacasService);
    expect(service).toBeTruthy();
  });
});
