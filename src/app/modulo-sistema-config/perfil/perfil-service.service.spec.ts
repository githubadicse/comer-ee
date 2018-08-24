import { TestBed, inject } from '@angular/core/testing';

import { PerfilServiceService } from './perfil-service.service';

describe('PerfilServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilServiceService]
    });
  });

  it('should ...', inject([PerfilServiceService], (service: PerfilServiceService) => {
    expect(service).toBeTruthy();
  }));
});
