import { TestBed, inject } from '@angular/core/testing';

import { MotivoIngresoService } from './motivo-ingreso.service';

describe('MotivoIngresoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MotivoIngresoService]
    });
  });

  it('should ...', inject([MotivoIngresoService], (service: MotivoIngresoService) => {
    expect(service).toBeTruthy();
  }));
});
