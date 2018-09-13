import { TestBed, inject } from '@angular/core/testing';

import { MotivoSalidaService } from './motivo-salida.service';

describe('MotivoSalidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MotivoSalidaService]
    });
  });

  it('should ...', inject([MotivoSalidaService], (service: MotivoSalidaService) => {
    expect(service).toBeTruthy();
  }));
});
