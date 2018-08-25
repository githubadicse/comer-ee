import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PerfilDetalleModel } from './perfil-detalle-model';
import { ConfigService } from '../../shared/config.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PerfilService {

  constructor(private configService:ConfigService, private httpCliente:HttpClient) { }


  getPerfilDetalleByIdLogin(login:string):Observable<PerfilDetalleModel[]>{
    
    let url = this.configService.getUrlSecurityRes("perfildetalle","getPerfilDetalleByLogin");
    let httpParams = new HttpParams().set("login",login.toString());

    
    return this.httpCliente.get<PerfilDetalleModel[]>(url,{params:httpParams});
///8h58gj8
  }

}
