import { Injectable } from '@angular/core';
import { ConfigService } from '../../../shared/config.service';
import { HttpClient } from '@angular/common/http';
import { MedioPagoModel } from './medio-pago.model';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class MedioPagoService {

  constructor(private configService:ConfigService, private httpClient : HttpClient) { }

  getall():Observable<MedioPagoModel[]> {
    let url= this.configService.getUrlSecurityRes("mediopago","getall");
    return this.httpClient.get <MedioPagoModel[]> (url);
  }
}
