import { Injectable } from '@angular/core';


import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../shared/config.service';
import { Observable } from 'rxjs';
import { EmpleadoModel } from './empleado-model';
import { UsuarioModel } from '../../modulo-sistema-config/usuario/usuario-model';

@Injectable()
export class EmpleadoService {

  constructor(private configService:ConfigService, private http:HttpClient) { }




  getEmpleadoByDni(dni: string) {
    let url = this.configService.getUrlSecurityRes("empleado", "getallbydni");
    let obj = { 'dni': dni };
    let objser = this.configService.serialize(obj);
    
    return this.http.post(url, objser, {headers:this.configService.getHeaderHttpClientFormPost()});

  }


  // muestra todos los empleados o filtra por filial si se especifica idfilial
  getByCondicionFilial(idfilial: number ):Observable<EmpleadoModel[]> {    
    debugger;
    const eventoController: string = idfilial === undefined ? 'getall' : 'findByCondicionFilial';
    let url = this.configService.getUrlSecurityRes("empleado", eventoController);
    //let header = this.configService.getHeaderHttpClientGet();
    let parametros = new HttpParams().set("condicion",idfilial.toString());    
    
    return this.http.get<EmpleadoModel[]>(url,{params:parametros });    
  }


}
