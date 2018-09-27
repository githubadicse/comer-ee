import { Injectable } from '@angular/core';
import { Headers, RequestOptions} from  '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
@Injectable()
export class UtilitariosAdicse {

    constructor(){

    }

    serialize(obj){
        var p = [];
        for (var key in obj) {
        	
        	if( encodeURIComponent(obj[key]) == "null"){
        		console.log("null");
            	
        	}else{
        		p.push(key + '=' + encodeURIComponent(obj[key]));
        	}
        }
        return p.join('&');
    
    }	  
    
    getDateString(fecha){
  
      let  today = fecha;
      let d = today;
      let m = today.getMonth() + 1;
      let mes = (m < 10) ? '0' + m : m;
      let yy = fecha.getYear();
      var year = (yy < 1000) ? yy + 1900 : yy;

      let sFecha = today.getDate()+'/' +mes+'/'+year;

      return [ today.getDate(), mes,year].join('/');

      //return sFecha;
            
    }

    getHoraString(fecha){
    
      let today=fecha;
      let h=today.getHours();
      let m=today.getMinutes();
      let s=today.getSeconds();
      let hora = h+':'+m+':'+s;
    
      return hora;
      
    }

    stringToDate(_date,_format,_delimiter)
    {
                var formatLowerCase=_format.toLowerCase();
                var formatItems=formatLowerCase.split(_delimiter);
                var dateItems=_date.split(_delimiter);
                var monthIndex=formatItems.indexOf("mm");
                var dayIndex=formatItems.indexOf("dd");
                var yearIndex=formatItems.indexOf("yyyy");
                var month=parseInt(dateItems[monthIndex]);
                month-=1;
                var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
                return formatedDate;
    }    

    stringToTime(_date,_format,_delimiter)
    {           
                let now = new Date();
                var formatLowerCase=_format.toLowerCase();
                var formatItems=formatLowerCase.split(_delimiter);
                var dateItems=_date.split(_delimiter);
                var horaIndex=formatItems.indexOf("hh");
                var minIndex=formatItems.indexOf("mm");
                var segIndex=formatItems.indexOf("ss");

                let hora = dateItems[horaIndex];
                let min = dateItems[minIndex];
                let seg = dateItems[segIndex];

                now.setHours(hora);
                now.setMinutes(min);

                if(!seg == undefined)
                  now.setSeconds(seg);

   
                return now;
    }    

    JSONFilterCustomer(obj){
      var p = [];
      for (let index = 0; index < obj.length; index++) {
        const element = obj[index];

        let ObjItem ={} ;
        let keyId;
        let elementId;
        for (let key in element) {
          keyId = key;
          elementId = element;
        	if( encodeURIComponent(element[key]) == "null"){
        		console.log("null");
        	}else{
            ObjItem[keyId] = {"value": encodeURIComponent(elementId[keyId])};
          }
         
        }        
        p.push(ObjItem);
        
      }
      return p;
    }


    //------- Table Filter   para crear filtros para materialize -----//
    //fiters es de tipo JSON.split 
    //para angular material
    //Ejemplo de un filtro desde la llmada
    //this._filter es de tipo objecto {}
    //ejemplo declaracion _filter = {}
    
    //this._filterPage = JSON.stringify( this.utilitariosAdicse.Tablefilter(this._filter,idAlmacen,'almacen.idalmacen','equals'  ));

    //value es el valor a buscar en el caso del ejemplo es la variable idAlmacen
    //field es el campo que se quiere buscar en el modelo de objectos del lado servidor. en nuestrocaso el objeto almacen y su propiedad idalmacen
    //y el operador es equal (=) puede ser tambien contains (like)
    Tablefilter (filters:Object,value, field:string, matchMode:string) {
     
      if (value) {
          filters[field] = { value: value, matchMode: matchMode };
      }
      else if (filters[field]) {
          delete filters[field];
      }
      return filters;
    };

    TablefilterReset () {
      return undefined;
    };

    //Esta funcion funciona para convertir objeto a array de objecto.
    //eje {id=5}  lo convierte a [{"id":{"value";5}}]
    setMapToString(obj){


        var p = [];
        for (var key in obj) {
          debugger;
        	if( encodeURIComponent(obj[key]) == "null"){
        		console.log("null");
        	}else{
                //["{'anno':{'value':"+this.anno.toString()+" }}"]
                p.push("{"+key + ":{'value':" + encodeURIComponent(obj[key])+ "}}");
                //p.push("{"+key + ":{'value':" + obj[key]+ "}}");
        	}
        }
        return p;
    }

    randomString(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }  
  
}