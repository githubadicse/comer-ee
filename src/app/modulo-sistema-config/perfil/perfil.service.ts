import { Observable } from "rxjs";
import { PerfilModel } from "./perfil-model";
import { PerfilDetalleModel } from "./perfil-detalle-model";
import { HttpParams, HttpClient } from "@angular/common/http";
import { ConfigService } from "../../shared/config.service";
import { Injectable } from "@angular/core";

@Injectable()
export class PerfilService {

  constructor(private configService:ConfigService, private httpCliente:HttpClient, private http: HttpClient) { }


  getPerfilDetalleByIdLogin(login:string):Observable<PerfilDetalleModel[]>{
    
    let url = this.configService.getUrlSecurityRes("perfildetalle","getPerfilDetalleByLogin");
    let httpParams = new HttpParams().set("login",login.toString());

    
    return this.httpCliente.get<PerfilDetalleModel[]>(url,{params:httpParams});

  }
  getPerfil():Observable<PerfilModel[]>{
    let url = this.configService.getUrlSecurityRes("perfil","getall");

    return this.http.get<PerfilModel[]>(url);
  }
}