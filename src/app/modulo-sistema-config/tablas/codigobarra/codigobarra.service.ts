import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../shared/config.service';


@Injectable()
export class CodigobarraService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  getAllByProductoIdproducto (idproducto: number) :Observable<any>{
    let obj = { 'idproducto': idproducto };
    let objser = this.configService.serialize(obj);

    let url = this.configService.getUrlSecurityRes("codigobarra", "getAllByProductoIdproducto");

    return this.http.post <any>(url, objser, {headers:this.configService.getHeaderHttpClientForm() } );
      
      

  }

  getAllByCodigoEquals(codigo: string) {
    let obj = { 'codigo': codigo };
    let objser = this.configService.serialize(obj);

    let url = this.configService.getUrlSecurityRes("codigobarra", "getAllByCodigoEquals");

    return this.http.post(url, objser,{headers :this.configService.getHeaderHttpClientForm() } )
      
      ;

  }
}
