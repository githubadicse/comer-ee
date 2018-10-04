import { ModalidadCompraVentaModule } from './modalidad-compra-venta.module';

describe('ModalidadCompraVentaModule', () => {
  let modalidadCompraVentaModule: ModalidadCompraVentaModule;

  beforeEach(() => {
    modalidadCompraVentaModule = new ModalidadCompraVentaModule();
  });

  it('should create an instance', () => {
    expect(modalidadCompraVentaModule).toBeTruthy();
  });
});
