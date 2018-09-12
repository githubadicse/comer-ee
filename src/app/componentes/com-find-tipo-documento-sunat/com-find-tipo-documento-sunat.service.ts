import { Injectable } from '@angular/core';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ComFindTipoDocumentoSunatService {

  public filtros: string = "";
  constructor(private crudSercice: CrudHttpClientServiceShared) { }

  public getAllFilter(): Observable<any>{ 
    return this.crudSercice.getAllByFilter('tipodocumento', 'getByFilter', this.filtros)    
  }
}
