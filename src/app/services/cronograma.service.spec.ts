import { TestBed } from '@angular/core/testing';

import { CronogramaService } from './cronograma.service';

describe('CronogramaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CronogramaService = TestBed.get(CronogramaService);
    expect(service).toBeTruthy();
  });
});
