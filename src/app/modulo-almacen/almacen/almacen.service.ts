import { Injectable } from '@angular/core';


import { AlmacenModel } from './almacen-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../shared/config.service';

@Injectable()
export class AlmacenService {

  constructor(
    private configService:ConfigService,
    private _http:HttpClient

  ) { }

  getAll():Observable<AlmacenModel[]>{
    let url = this.configService.getUrlSecurityRes("almacen","getall");
    return this._http.get<AlmacenModel[]>(url);
  }

  getAlmacenByIdFilial(){
    
  }



}
