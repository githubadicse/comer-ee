import { TestBed, inject } from '@angular/core/testing';

import { PuntoDeVentaService } from './punto-de-venta.service';

describe('PuntoDeVentaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuntoDeVentaService]
    });
  });

  it('should be created', inject([PuntoDeVentaService], (service: PuntoDeVentaService) => {
    expect(service).toBeTruthy();
  }));
});
