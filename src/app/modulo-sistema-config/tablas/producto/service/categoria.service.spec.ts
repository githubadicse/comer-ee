import { TestBed, inject } from '@angular/core/testing';

import { CategoriaService } from './categoria.service';

describe('CategoriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaService]
    });
  });

  it('should ...', inject([CategoriaService], (service: CategoriaService) => {
    expect(service).toBeTruthy();
  }));
});
