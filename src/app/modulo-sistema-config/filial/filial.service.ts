import { Injectable } from '@angular/core';
import { FilialModel } from './filial-model';
import { Observable } from '../../../../node_modules/rxjs';
import { ConfigService } from '../../shared/config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PerfilModel } from '../perfil/perfil-model';
@Injectable()
export class FilialService {
 
  constructor(private configService: ConfigService, private http: HttpClient) { }



  getFilialFilter(query: string) {

    let obj = { 'dscfilial': query };
    let objser = this.configService.serialize(obj);

    let url = this.configService.getUrlSecurityRes("filial", "findAllByDscFilialContainsIgnoreCaseOrderByDscFilial");
    let header = this.configService.getHeaderHttpClientFormPost();
    return this.http.post(url, objser, { headers: header })

  }


  // findById(id, controller: string, evento: string) {
  //   let obj = { 'id': id };
  //   let objser = this.configService.serialize(obj);
  //   let url = this.configService.getUrlSecurityRes("filial", "findbyid");
  //   let header = this.configService.getHeaderHttpClientFormPost();

  //   return this.http.post(url, objser, { headers: header });


  // }

  // extractData(res: Response) {
  //   let body = res.json();
  //   let item = new FilialModel();
  // }

  getall():Observable<FilialModel[]>{
    let url = this.configService.getUrlSecurityRes("filial","getall");

    return this.http.get<FilialModel[]>(url);
  }
  getFilial():Observable<FilialModel[]>{
    let url = this.configService.getUrlSecurityRes("filial","getall");

    return this.http.get<FilialModel[]>(url);
  }

  // filterGlobal(dato:String):Observable<FilialModel[]>{
  //   let url = this.configService.getUrlSecurityRes("filial","filterGlobal");
  //   let parametros = new HttpParams().set("dato",dato.toString());
  //   return this.http.get<FilialModel[]>(url,{params:parametros});
  // }
}
