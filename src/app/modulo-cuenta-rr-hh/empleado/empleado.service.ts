import { Injectable } from '@angular/core';


import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../shared/config.service';

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
  getByCondicionFilial(idfilial: string ) {    
    const eventoController: string = idfilial === '' ? 'getall' : 'findByCondicionFilial';
    let url = this.configService.getUrlSecurityRes("empleado", eventoController);
    let header = this.configService.getHeaderHttpClientGet();
    let parametros = new HttpParams().set("condicion",idfilial);    
    
    return this.http.get(url,{params:parametros, headers:header});    
  }

}
