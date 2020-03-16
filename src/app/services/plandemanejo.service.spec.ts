import { TestBed } from '@angular/core/testing';

import { PlandemanejoService } from './plandemanejo.service';

describe('PlandemanejoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlandemanejoService = TestBed.get(PlandemanejoService);
    expect(service).toBeTruthy();
  });
});
