import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProveedorclienteModel } from './proveedorcliente-model';
import { ConfigService } from '../../../shared/config.service';









@Injectable()
export class ProveedorclienteService {
  log: any;

  constructor(private configService: ConfigService, private http: HttpClient) { }


  getProveedorclienteFilter(query: string) {

    let obj = { 'razonsocial': query };
    let objser = this.configService.serialize(obj);

    let url = this.configService.getUrlSecurityRes("proveedorcliente", "findAllByRazonsocialContainsIgnoreCaseOrderByRazonsocial");
    let header = this.configService.getHeaderHttpClientFormPost();
    return this.http.post(url, objser, { headers: header })

  }


  findById(id, controller: string, evento: string) {
    let obj = { 'id': id };
    let objser = this.configService.serialize(obj);
    let url = this.configService.getUrlSecurityRes("proveedorcliente", "findbyid");
    let header = this.configService.getHeaderHttpClientFormPost();

    return this.http.post(url, objser, { headers: header });


  }

  extractData(res: Response) {
    let body = res.json();
    let item = new ProveedorclienteModel();
    //item.idproveedorcliente = body.idproveedorcliente;
    /* this.weather.city = body.name;
    this.weather.description = body.weather[0].main;
    this.weather.temp = body.main.temp;
    console.log(this.weather); */
    //return item;
  }

  getall():Observable<ProveedorclienteModel[]>{
    let url = this.configService.getUrlSecurityRes("proveedorcliente","getall");

    return this.http.get<ProveedorclienteModel[]>(url);
  }

  filterGlobal(dato:String):Observable<ProveedorclienteModel[]>{
    let url = this.configService.getUrlSecurityRes("proveedorcliente","filterGlobal");
    let parametros = new HttpParams().set("dato",dato.toString());
    return this.http.get<ProveedorclienteModel[]>(url,{params:parametros});
  }





}
