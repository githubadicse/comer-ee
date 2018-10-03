import { TestBed, inject } from '@angular/core/testing';

import { ModalidadCompraVentaService } from './modalidad-compra-venta.service';

describe('ModalidadCompraVentaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalidadCompraVentaService]
    });
  });

  it('should be created', inject([ModalidadCompraVentaService], (service: ModalidadCompraVentaService) => {
    expect(service).toBeTruthy();
  }));
});
