import { TestBed, inject } from '@angular/core/testing';

import { CodigobarraService } from './codigobarra.service';

describe('CodigobarraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodigobarraService]
    });
  });

  it('should ...', inject([CodigobarraService], (service: CodigobarraService) => {
    expect(service).toBeTruthy();
  }));
});
