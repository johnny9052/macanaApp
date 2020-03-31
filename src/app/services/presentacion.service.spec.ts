import { TestBed } from '@angular/core/testing';

import { PresentacionService } from './presentacion.service';

describe('PresentacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentacionService = TestBed.get(PresentacionService);
    expect(service).toBeTruthy();
  });
});
