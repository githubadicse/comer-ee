
import { Injectable } from '@angular/core';
import { ConfigService } from "../config.service";
import { HttpClient,  HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions, ResponseContentType } from '@angular/http';

@Injectable()
export class SharedService {

  constructor(private configService:ConfigService, 
   
    private httpClient: HttpClient
  ) { }

  getAll(controller:string,evento:string){

		  let url = this.configService.getUrlSecurityRes (controller,evento);
   		return this.httpClient.get(url)
          ;		     
  }  

  findById(id,controller:string,evento:string):Observable<any>{
    let obj = {'id':id};
    let objser = this.configService.serialize(obj);

	  let url = this.configService.getUrlSecurityRes (controller,evento);

        return this.httpClient.post(url, objser ,{headers:this.configService.getHeaderHttpClientForm()})
          
            ;    
  }

  save(model,controller:string,evento:string){
      let jsonModel = JSON.stringify(model);
      console.log(jsonModel);

      localStorage.setItem('pintar', controller); // para actualizar las listas despues de modificar o guardar

		  let url = this.configService.getUrlSecurityRes(controller,evento);
   		return this.httpClient.post(url,jsonModel,{headers:this.configService.getHeaderHttpClientForm()})
           ;		                 


  }

  delete(id,controller:string,evento:string){
    let obj = {'id':id};
    let objser = this.configService.serialize(obj);   

    let url = this.configService.getUrlSecurityRes(controller,evento);

     return this.httpClient.post(url, objser ,{headers:this.configService.getHeaderHttpClientForm()})
           
            ;       

  }
  

	getPagination(pagenumber,rows,sortdireccion,sortcolumn,filters,controller,evento,paramsExtra):Observable<any>{

  
		let obj = {'pagenumber':pagenumber,'rows':rows,'sortdireccion':sortdireccion,'sortcolumn':sortcolumn,'filters':filters, 'paramsExtra':paramsExtra};
    let objser = this.configService.serialize(obj);

  

      let url = this.configService.getUrlSecurityRes(controller,evento);
      return this.httpClient.post(url, objser,{headers:this.configService.getHeaderHttpClientForm() });

   		//return this.http.post(url,objser,this.configService.getHeadersForm())
      //      .map(res=> res.json());		             


  }    

  getPdfKardexProducto(controller:string,evento:string,mes:number,anno:number,idalmacen:number,idproducto:number){
   

    
    let url = this.configService.getUrlSecurityRes (controller,evento);
    url = url + "?mes="+mes.toString()+"&anno="+anno.toString()+"&idalmacen="+idalmacen.toString()+"&idproducto="+idproducto.toString();
    let headers = new Headers({ 'Authorization': 'Bearer '+localStorage.getItem("token") });
    //headers.append("mes",mes.toString());
    let options = new RequestOptions({responseType: ResponseContentType.Blob});       
    //  return this.http.get (url,  options )
    //     .map(
    //         res => res
          
    //     ).subscribe(
    //         res => {
  
    //                 let mediaType = res.headers.get("Content-Type");
    //                 let blob = new Blob([res.blob() ], { type: mediaType });
    //                  let urlCreator = window.URL;
    //                 let url = urlCreator.createObjectURL(blob);
    //                 window.open(url,"titulo","height=600, width=600, status=yes, toolbar=no, menubar=no, location=no") ;
      
    //   },
    //   err => { console.log("error... al mostrar imagen...") }
    //   , 
    //     () => { console.log("completo subid ") }                  
    //   ) ;		     
}  


          
  getPdfXlsBasic(controller:string,evento:string){
		  let url = this.configService.getUrlSecurityRes (controller,evento);
      let headers = new Headers({ 'Authorization': 'Bearer '+localStorage.getItem("token") });
      let options = new RequestOptions({responseType: ResponseContentType.Blob });       
    /*    return this.http.get(url, options )
          .map(
              res => res
            
          ).subscribe(
              res => {
		
			              	let mediaType = res.headers.get("Content-Type");
				              let blob = new Blob([res.blob() ], { type: mediaType });
	 			              let urlCreator = window.URL;
				              let url = urlCreator.createObjectURL(blob);
                      window.open(url,"titulo","height=600, width=600, status=yes, toolbar=no, menubar=no, location=no") ;
        
        },
			  err => { console.log("error... al mostrar imagen...") }
        , 
          () => { console.log("completo subid ") }                  
        ) ;		      */
  }  


  getMeses(){
    let meses = [{id:1,mes:'Enero'},
                  {id:2,mes:'Febrero'},
                  {id:3,mes:'Marzo'},
                  {id:4,mes:'Abril'},
                  {id:5,mes:'Mayo'},
                  {id:6,mes:'Junio'},
                  {id:7,mes:'Julio'},
                  {id:8,mes:'Agosto'},
                  {id:9,mes:'Setiembre'},
                  {id:10,mes:'Octubre'},
                  {id:11,mes:'Noviembre'},
                  {id:12,mes:'Diciembre'}];
    return meses;

  }


  // para refrescar las listas despues de agregar o modificar registros por el crud
  refreshByStorage(controller: string): boolean {
    const valorPintarStorage = localStorage.getItem('pintar') || '';
    const rpt = valorPintarStorage === controller ? true : false;
    if (rpt) { localStorage.removeItem('pintar'); }
    return rpt;
  }

}
