import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarcaArticuloModel } from './marca-articulo-model';
import { ConfigService } from '../../../shared/config.service';





@Injectable()
export class MarcaArticuloService {

  constructor( private httpClient:HttpClient, private configService:ConfigService) { }

  getMarcaForDsc(dsc: string): Observable<MarcaArticuloModel[]> {
    let obj = { 'dscmarca': dsc };
    let objser = this.configService.serialize(obj);

    let url = this.configService.getUrlSecurityRes("marca", "findByDscmarcaContainingIgnoreCaseOrderByDscmarcaAsc");

    return this.httpClient.post<MarcaArticuloModel[]>(url, objser,{headers : this.configService.getHeaderHttpClientForm() })
     
      ;

  }

  getMarcaArticulos(): Observable<MarcaArticuloModel[]> {
    let url = this.configService.getUrlSecurityRes("marca","getall");
    let header = this.configService.getHeaderHttpClientGet();

    return this.httpClient.get<MarcaArticuloModel[]>(url,{headers:header});

  }

  getMarcaArticulo(id:number):Observable<MarcaArticuloModel>{

    let url = this.configService.getUrlSecurityRes("marca","findbyid");
    let header = this.configService.getHeaderHttpClientGet();
    let params = new HttpParams().set("id",id.toString())

    return this.httpClient.get<MarcaArticuloModel>(url,{headers:header,params:params});

  }

}
