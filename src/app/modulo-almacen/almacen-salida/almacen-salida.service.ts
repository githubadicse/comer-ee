import { Injectable } from '@angular/core';

import {  Http, Headers, RequestOptions,  ResponseContentType } from '@angular/http';
import { ConfigService } from '../../shared/config.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AlmacenSalidaService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  getProductosFilter(query: string) {

    let obj = { 'dscproducto': query };
    let objser = this.configService.serialize(obj);

    let url = this.configService.getUrlSecurityRes("producto", "findByDscproductoContainingIgnoreCaseOrderByDscproducto");
    let header = this.configService.getHeaderHttpClientFormPost();
    //return this.http.post(url, objser,{headers:header} );
    return null;



  }




  getPdfNotaSalida(controller: string, evento: string, id: number) {

    let url = this.configService.getUrlSecurityRes(controller, evento);
    url = url + "?id=" + id.toString();
    let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem("token") });

    let options = new RequestOptions({ responseType: ResponseContentType.Blob, headers });
    // return this.http.get(url, options);
    /*   .map(
        res => res

      ).subscribe(
        res => {

          let mediaType = res.headers.get("Content-Type");
          let blob = new Blob([res.blob()], { type: mediaType });
          let urlCreator = window.URL;
          let url = urlCreator.createObjectURL(blob);
          window.open(url, "titulo", "height=600, width=600, status=yes, toolbar=no, menubar=no, location=no");

        },
        err => { console.log("error... al mostrar imagen...") }
        ,
        () => { console.log("completo subid ") }
      ); */
  }


  getPdListaNotaSalidaPorProducto(idproducto: number, idperiodoalmacen: number) {
    let controller = "salida001";
    let evento = "pdflistasalidas";

    let url = this.configService.getUrlSecurityRes(controller, evento);
    url = url + "?idproducto=" + idproducto.toString() + "&idperiodoalmacen=" + idperiodoalmacen;
    let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem("token") });

    let options = new RequestOptions({ responseType: ResponseContentType.Blob, headers });
    // return this.http.get(url, options)
    /*  .map(
       res => res   
     ).subscribe(
     res => {
 
       let mediaType = res.headers.get("Content-Type");
       let blob = new Blob([res.blob()], { type: mediaType });
       let urlCreator = window.URL;
       let url = urlCreator.createObjectURL(blob);
       window.open(url, "titulo", "height=600, width=600, status=yes, toolbar=no, menubar=no, location=no");
 
     },
     err => { console.log("error... al mostrar imagen...") }
     ,
     () => { console.log("completo subid ") }
     ); */
  }

}
