import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class CrudHttpClientServiceShared {



  constructor(private configService:ConfigService, private httpClient:HttpClient) { }

  getall(controller:string,evento:string,urlBasic?:boolean):Observable<any[]>{
    let url = urlBasic ? this.configService.getUrlBasic(controller, evento) : this.configService.getUrlSecurityRes(controller, evento);
    //let url = this.configService.getUrlSecurityRes(controller, evento);
    //let header = this.configService.getHeaderHttpClientGet();
       
    return this.httpClient.get<any[]>(url);
  }

  //este evento retorna un solo elemento, para modificar o mostrar.
  edit(id: any, controller: string, evento: string):Observable<any>{
    //let url = urlBasic ? this.configService.getUrlBasic(controller, evento) : this.configService.getUrlSecurityRes(controller, evento);    
    let url = this.configService.getUrlSecurityRes(controller,evento);
    let header = this.configService.getHeaderHttpClientGet();
    let parametros = new HttpParams().set("id",id.toString());

    return this.httpClient.get<any>(url,{params:parametros,headers:header});
  
  }

  create(model:any,controller:string,evento:string):Observable<any>{
    let url = this.configService.getUrlSecurityRes(controller,evento);
    let header = this.configService.getHeaderHttpClientGet();

    localStorage.setItem('pintar', controller); // para actualizar las listas despues de modificar o guardar

    return this.httpClient.post<any>(url,model,{headers:header});

  }
  update(model:any,controller:string,evento:string):Observable<any>{
      
    let url = this.configService.getUrlSecurityRes(controller,evento);
    let header = this.configService.getHeaderHttpClientGet();

    localStorage.setItem('pintar', controller); // para actualizar las listas despues de modificar o guardar
    
    return this.httpClient.put<any>(url,model,{headers:header});
  }

  delete(id: any, controller: string, evento: string, urlBasic?: boolean):Observable<any>{
    let url = urlBasic ? `${this.configService.getUrlBasic(controller, evento)}/${id}` : `${this.configService.getUrlSecurityRes(controller, evento)}/${id}`;
    //let url = `${this.configService.getUrlSecurityRes(controller,evento)}/${id}`;
    let header = this.configService.getHeaderHttpClientGet();
      
    return this.httpClient.delete<any>(url,{headers:header });

  }

  getPagination(pagenumber,rows,sortdireccion,sortcolumn,filters,controller,evento,paramsExtra):Observable<any>{

		let obj = {'pagenumber':pagenumber,'rows':rows,'sortdireccion':sortdireccion,'sortcolumn':sortcolumn,'filters':filters, 'paramsExtra':paramsExtra};
    let objser = this.configService.serialize(obj);

    let url = this.configService.getUrlSecurityRes(controller,evento);    
    return this.httpClient.post(url, objser,{headers:this.configService.getHeaderHttpClientForm() });         

  }

  // paginacion con fitro com.adicse.comercial.specification.Filter;
  // el fitro es enviado desde la config.service>jsonFilterTablePrime 
  // con operadores logicos {and > {or, or, or ...}}
  getPaginaionWithFilter(pagenumber,rows,sortdireccion,sortcolumn,filters,controller,evento,paramsExtra): Observable<any> {
      
    let obj = {'pagenumber':pagenumber,'rows':rows,'sortdireccion':sortdireccion,'sortcolumn':sortcolumn,'paramsExtra':paramsExtra};
    let objser = this.configService.serialize(obj);
    let url = this.configService.getUrlSecurityRes(controller,evento) +'?'+ objser;

    const header = this.configService.getHeaderHttpClientGet();
    
    return this.httpClient.post(url, filters, { headers: header });
  }
  
  getAllByFilter(controller: string, evento: string, filters: string): Observable<any> {
    //const url = `${this.url}/${controller}/${evento}`;
    //const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.configService.getUrlSecurityRes(controller, evento);
    let header = this.configService.getHeaderHttpClientGet();
    const filtros = JSON.stringify(JSON.stringify(this.configService.jsonFilter(filters)));

    //console.log('filtros del filtro:', filtros);
    return this.httpClient.post(url, filtros, { headers: header });
  }

 

}
