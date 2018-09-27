import { ModuloComprasModule } from './modulo-compras.module';

describe('ModuloComprasModule', () => {
  let moduloComprasModule: ModuloComprasModule;

  beforeEach(() => {
    moduloComprasModule = new ModuloComprasModule();
  });

  it('should create an instance', () => {
    expect(moduloComprasModule).toBeTruthy();
  });
});
