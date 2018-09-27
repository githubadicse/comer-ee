import { Component, OnInit } from '@angular/core';
import { GuiaRemisionService } from '../guia-remision.service';
import { ItemEntregaModel } from '../../item-entrega/item-entrega-model';
import { ItemEntregaService } from '../../item-entrega/item-entrega.service';

@Component({
  selector: 'app-guia-remision-edit',
  templateUrl: './guia-remision-edit.component.html',
  styleUrls: ['./guia-remision-edit.component.css'],
  providers : [GuiaRemisionService,ItemEntregaService]
})
export class GuiaRemisionEditComponent implements OnInit {

  public serie:number=1;
  public numero:number=1;
  public codigoModular:string="";
  public numeroEntrega:number = 1;
  public anno:number=2018;

  public itemEntregaModel:ItemEntregaModel;
  public itemEntregasModel:ItemEntregaModel[];

  constructor(private guiaRemisionService:GuiaRemisionService, private itemEntregaService:ItemEntregaService) { }

  ngOnInit() {
    let f = new Date();
    this.anno = f.getFullYear();
    this.getItemEntregaByAnno();
  }

  getItemEntregaByAnno(){
    this.itemEntregaService.getItems(this.anno).subscribe(
      res=>{
        this.itemEntregasModel = res.map(
           item=>{
            return new ItemEntregaModel(item.item,item.dscitem,item.anno);
          }
        )
      }
      ,error=>console.log(error)
      ,()=>{
        console.log(this.itemEntregasModel)
      }
    )
  }

  setItem(e){
    debugger;
    this.itemEntregaModel = e;
  }

  getGuiaRemisionPorItemAnno(){
    let idItem:string = this.itemEntregaModel.item;
    this.guiaRemisionService.getGuiaRemisionPorItemAnno (idItem,this.anno,this.numeroEntrega).subscribe(

      res => {
        
        if (res.body.size == 0) {
          //this.showError();
          console.log("Errorr")
          
          return;
        }
        //console.log(res.headers.get('X-Custom-Header'));
        console.log(res)
       
        let mediaType = res.headers.get("Content-Type");
        console.log(mediaType)
        let blob = new Blob([res.body], { type: mediaType });
        //let file = new window.Blob([res.body], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      }
    )
   }

  getGuiaRemisionPorSerieNumero(){
    this.guiaRemisionService.getGuiaRemisionPorSerieNumero(this.serie,this.numero).subscribe(

      res => {
        
        if (res.body.size == 0) {
          //this.showError();
          console.log("Errorr")
          
          return;
        }
        //console.log(res.headers.get('X-Custom-Header'));
        console.log(res)
       
        let mediaType = res.headers.get("Content-Type");
        console.log(mediaType)
        let blob = new Blob([res.body], { type: mediaType });
        //let file = new window.Blob([res.body], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      }
    )
   }



   getGuiaRemisionPorCodigoModular (){
    let d = new Date();
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    let nombre = "VOLUMEN -"+this.anno + "-" + this.numeroEntrega + "-" + d.getDate()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();
    this.guiaRemisionService.getGuiaRemisionPorCodigoModular ( this.anno,this.numeroEntrega,this.codigoModular ).subscribe(

      res => {
        
        if (res.body.size == 0) {
          //this.showError();
          console.log("Errorr")
          
          return;
        }
        //console.log(res.headers.get('X-Custom-Header'));
        console.log(res)
       
        let mediaType = res.headers.get("Content-Type");
        console.log(mediaType)
        let blob = new Blob([res.body], { type: mediaType });
        //let file = new window.Blob([res.body], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(blob);
        //a.href = fileURL;
        //a.download = nombre +".pdf";
        //a.click();        
        //window.URL.revokeObjectURL(fileURL) ;
        window.open(fileURL);

      }
    )
   }
}
