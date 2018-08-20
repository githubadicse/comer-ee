import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from './usuario-model';
import { Observable } from 'rxjs';
import { ConfigService } from '../../shared/config.service';

@Injectable()
export class UsuarioService {
  constructor(private configService:ConfigService, private httpClient:HttpClient) { }
  getAll():Observable<UsuarioModel[]>{
    let url = this.configService.getUrlSecurityRes("usuario","getall");
    return this.httpClient.get<UsuarioModel[]>(url);
  }
}

