import { Response, Http, Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Options } from 'selenium-webdriver/opera';

import { ProductoModel } from '../model/producto.model';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../../../shared/config.service';




@Injectable()
export class ProductoService {

  constructor(
      private configService:ConfigService,
      private httpClient:HttpClient

  ) { }

	  
  getPdfListaProductos() {
    let url = this.configService.getUrlSecurityRes ("producto","pdfLista");
    
    let header = this.configService.getHeaderHttpClientGet();
    
     return this.httpClient.get(url,   {headers:header, responseType:'blob', observe: 'response'});
     
    
   
  }

  getProductoByCodigoBarras(codigobarra: string): Observable<ProductoModel[]> {

    let url = this.configService.getUrlSecurityRes("producto", "getProductoByCodigoBarras");

    let parm = new HttpParams().set("codigo", codigobarra);

    return this.httpClient.get<ProductoModel[]>(url, { params: parm });
  }

  getProductoByParametro(parametro: string, idalmacen: number): Observable<any[]> {

    let url = this.configService.getUrlSecurityRes('stockactual', "getByParametroList");

    let parm = new HttpParams().set("parametro", parametro);
    parm = parm.append("idalmacen", idalmacen.toString());

    return this.httpClient.get<ProductoModel[]>(url, { params: parm });
  }

  getProductoByParametroPageable(pagenumber,rows,parametro: string, idalmacen: number): Observable<any[]> {

    let url = this.configService.getUrlSecurityRes('stockactual', "getByParametroPageable");
    
    let obj = {'pagenumber':pagenumber,'rows':rows,'idalmacen':idalmacen, 'parametro': parametro};
    let objser = this.configService.serialize(obj);    

    return this.httpClient.post<ProductoModel[]>(url, objser,{headers:this.configService.getHeaderHttpClientForm() });
  }

}
