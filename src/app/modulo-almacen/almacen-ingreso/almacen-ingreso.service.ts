import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../../shared/config.service';
import { ProductoModel } from '../../modulo-sistema-config/tablas/producto/model/producto.model';





@Injectable()
export class AlmacenIngresoService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  getProductosFilter(query: string):Observable<ProductoModel[]> {

    let obj = { 'dscproducto': query };
    let objser = this.configService.serialize(obj);
    let header = this.configService.getHeaderHttpClientForm();

    let url = this.configService.getUrlSecurityRes("producto", "findByDscproductoContainingIgnoreCaseOrderByDscproducto");

    return this.http.post<ProductoModel[]>(url, objser, {headers:header} ) ;

  }




  getPdfNotaIngreso(controller: string, evento: string, id: number):Observable<any> {

    let url = this.configService.getUrlSecurityRes("guiaremision", "guiaRemisionPorSerieNumero");
   
    let header = this.configService.getHeaderHttpClientForm();

    let params = new HttpParams()
      .set("id", id.toString())
     

    return this.http.get(url, { params, headers: header, responseType: 'blob', observe: 'response' });

    //let url = this.configService.getUrlSecurityRes(controller, evento);
    // url = url + "?id=" + id.toString();
    // let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem("token") });

    // let options = new RequestOptions({ responseType: ResponseContentType.Blob, headers });
    // return this.http.get(url, options)
    //   .map(
    //   res => res

    //   ).subscribe(
    //   res => {

    //     let mediaType = res.headers.get("Content-Type");
    //     let blob = new Blob([res.blob()], { type: mediaType });
    //     let urlCreator = window.URL;
    //     let url = urlCreator.createObjectURL(blob);
    //     window.open(url, "titulo", "height=600, width=600, status=yes, toolbar=no, menubar=no, location=no");

    //   },
    //   err => { console.log("error... al mostrar imagen...") }
    //   ,
    //   () => { console.log("completo subid ") }
    //   );
  }


  getPdListaNotaIngresoPorProducto(idproducto: number, idperiodoalmacen:number) {
        let controller = "ing001";
        let evento = "pdflistaingresos";

        let url = this.configService.getUrlSecurityRes("guiaremision", "guiaRemisionPorSerieNumero");
   
        let header = this.configService.getHeaderHttpClientForm();
    
        let params = new HttpParams()
          .set("idproducto", idproducto.toString())
          .set("idperiodoalmacen", idperiodoalmacen.toString())
    
        return this.http.get(url, { params, headers: header, responseType: 'blob', observe: 'response' });
    
       // let url = this.configService.getUrlSecurityRes(controller, evento);
        // url = url + "?idproducto=" + idproducto.toString()+"&idperiodoalmacen=" + idperiodoalmacen ;
        // let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem("token") });
    
        // let options = new RequestOptions({ responseType: ResponseContentType.Blob, headers });
        // return this.http.get(url, options)
        //   .map(
        //     res => res   
        //   ).subscribe(
        //   res => {
    
        //     let mediaType = res.headers.get("Content-Type");
        //     let blob = new Blob([res.blob()], { type: mediaType });
        //     let urlCreator = window.URL;
        //     let url = urlCreator.createObjectURL(blob);
        //     window.open(url, "titulo", "height=600, width=600, status=yes, toolbar=no, menubar=no, location=no");
    
        //   },
        //   err => { console.log("error... al mostrar imagen...") }
        //   ,
        //   () => { console.log("completo subid ") }
        //   );
  }


}
