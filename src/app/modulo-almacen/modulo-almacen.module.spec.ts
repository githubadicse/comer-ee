import { ModuloAlmacenModule } from './modulo-almacen.module';

describe('ModuloAlmacenModule', () => {
  let moduloAlmacenModule: ModuloAlmacenModule;

  beforeEach(() => {
    moduloAlmacenModule = new ModuloAlmacenModule();
  });

  it('should create an instance', () => {
    expect(moduloAlmacenModule).toBeTruthy();
  });
});
