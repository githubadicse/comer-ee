import { Response, Http, Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Options } from 'selenium-webdriver/opera';
import { ConfigService } from '../../../shared/config.service';
import { ProductoModel } from '../model/producto.model';
import { Observable } from 'rxjs/Observable';




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

}
