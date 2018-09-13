import { Injectable } from '@angular/core';

import { Http } from "@angular/http";
import { HttpParams, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../../../shared/config.service';



@Injectable()
export class ProductodetalleServiceService {

  constructor(private configService:ConfigService,
    private httpClient:HttpClient
  ) { }


  generaCodigobarra(codigo){
   let obj = {'codigo':codigo};
    let objser = this.configService.serialize(obj);

	  let url = this.configService.getUrlSecurityRes ("codigobarra","generacodigobarra");

        return this.httpClient.post(url, objser , {headers:this.configService.getHeaderHttpClientFormPost()})
            ;
  }

  guardarImagen(formData: FormData){
    let url = this.configService.getUrlSecurityRes("producto", "uploadimage");
    return this.httpClient.put<any>(url, formData);

  }

  getUrlUploadImage(){
    let url = this.configService.getUrlSecurityRes ("producto","uploadimage");
    return url;
  }

   getImage(idproducto,imageSize):Observable<any>{
       let obj = {'idproducto':idproducto,'imageSize':imageSize};

       let objser = this.configService.serialize(obj);
           
   
       let url = this.configService.getUrlSecurityRes("producto","getImage");

        
       return this.httpClient.post(url, objser , { headers:this.configService.getHeaderHttpClientFormPost()} )
            
            ;


    }  

}
