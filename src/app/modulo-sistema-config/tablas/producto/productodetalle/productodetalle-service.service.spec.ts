import { TestBed, inject } from '@angular/core/testing';

import { ProductodetalleServiceService } from './productodetalle-service.service';

describe('ProductodetalleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductodetalleServiceService]
    });
  });

  it('should ...', inject([ProductodetalleServiceService], (service: ProductodetalleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
