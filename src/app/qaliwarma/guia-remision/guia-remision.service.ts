import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuiaRemisionModel } from './guia-remision-model';

@Injectable()
export class GuiaRemisionService {

  constructor(private configService: ConfigService, private httpClient: HttpClient) { }


  getGuiaRemisionPorSerieNumero(serie: number, numero: number) {

    let url = this.configService.getUrlSecurityRes("guiaremision", "guiaRemisionPorSerieNumeroReport");
    //let params = {serie:serie,numero:numero};
    let header = this.configService.getHeaderHttpClientForm();

    let params = new HttpParams()
      .set("serie", serie.toString())
      .set("numero", numero.toString())

    return this.httpClient.get(url, { params, headers: header, responseType: 'blob', observe: 'response' });


  }

  getGuiaRemisionPorItemAnno(iditem: string, anno: number, numeroEntrega:number) {

    let url = this.configService.getUrlSecurityRes("guiaremision", "guiasRemisionPorItemReport");
    //let params = {serie:serie,numero:numero};
    let header = this.configService.getHeaderHttpClientForm();

    let params = new HttpParams()
      .set("idItem", iditem )
      .set("anno",anno.toString())
      .set("numeroEntrega",numeroEntrega.toString())

    return this.httpClient.get(url, { params, headers: header, responseType: 'blob', observe: 'response' });


  }

  getGuiaRemisionPorCodigoModular(anno: number, numeroEntrega: number, codigoModular: string) {

    let url = this.configService.getUrlSecurityRes("guiaremision", "guiaRemisionPorCodigoModularReport");
    //let params = {serie:serie,numero:numero};
    let header = this.configService.getHeaderHttpClientForm();

    let params = new HttpParams()
      .set("anno", anno.toString())
      .set("numeroEntrega", numeroEntrega.toString())
      .set("codigoModular", codigoModular.toString())

    return this.httpClient.get(url, { params, headers: header, responseType: 'blob', observe: 'response' });


  }

  getGuiaRemisionPorCodigoModularJson(anno: number, numeroEntrega: number, codigoModular: string):Observable<GuiaRemisionModel> {

    let url = this.configService.getUrlSecurityRes("guiaremision", "guiaRemisionPorCodigoModularJson");
    //let params = {serie:serie,numero:numero};
    let header = this.configService.getHeaderHttpClientForm();

    let params = new HttpParams()
      .set("anno", anno.toString())
      .set("numeroEntrega", numeroEntrega.toString())
      .set("codigoModular", codigoModular.toString())

    return this.httpClient.get<GuiaRemisionModel>(url, { params });


  }
}
