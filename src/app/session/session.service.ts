import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private configService:ConfigService,
    private httpCliente:HttpClient
  ) { }

  sendCredentials(model):Observable<HttpResponse<any>>  {
    let tokenUrl= this.configService.getUrlBasic("usuario","login2");
    
 
    let repuesta;
   
    let header = this.configService.getHeaderHttpClientFormPostOnlyTypeJson()
 
    let obj = JSON.stringify(model);
        
    let data;
    return this.httpCliente.post<HttpResponse<any>>(tokenUrl,obj)
 

  }    

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`{operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
