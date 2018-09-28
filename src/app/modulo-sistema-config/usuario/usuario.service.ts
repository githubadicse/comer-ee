import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../shared/config.service';
import { UsuarioModel } from './usuario-model';
import { Observable } from 'rxjs';



@Injectable()
export class UsuarioService {

  constructor(private configService: ConfigService, private httpCliente:HttpClient
    , private http: HttpClient

  ) { }


  getUrlUploadImage() {
    let url = this.configService.getUrlSecurityRes("usuario", "uploadimage");
    return url;
  }

  getImage(idusuario, imageSize) {
    let obj = { 'idusuario': idusuario, 'imageSize': imageSize };

    let objser = this.configService.serialize(obj);


    let url = this.configService.getUrlSecurityRes("usuario", "getImage");


    return this.http.post(url, objser, {headers:this.configService.getHeaderHttpClientForm() , responseType:'json' } )
      
      ;


  }

  getUsuario():Observable<UsuarioModel[]>{
    let url = this.configService.getUrlSecurityRes("usuario","getall");

    return this.httpCliente.get<UsuarioModel[]>(url);
    
  }
}
