import { Injectable } from '@angular/core';
import { FilialModel } from './filial-model';
import { Observable } from '../../../../node_modules/rxjs';
import { ConfigService } from '../../shared/config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PerfilModel } from '../perfil/perfil-model';
@Injectable()
export class FilialService {
 
  constructor(private configService: ConfigService, private http: HttpClient) { }
///lui
// comentario desde marcel
  
  getFilialFilter1(query: string) {
    let obj = { 'dscfilial': query };
    let objser = this.configService.serialize(obj);

    let url = this.configService.getUrlSecurityRes("filial", "findAllByDscFilialContainsIgnoreCaseOrderByDscFilial");
    let header = this.configService.getHeaderHttpClientFormPost();
    return this.http.post(url, objser, { headers: header })

  }
  getall():Observable<FilialModel[]>{
    let url = this.configService.getUrlSecurityRes("filial","getall");
    return this.http.get<FilialModel[]>(url);
  }
  getFilial():Observable<FilialModel[]>{
    let url = this.configService.getUrlSecurityRes("filial","getall");
    return this.http.get<FilialModel[]>(url);
  }
}
