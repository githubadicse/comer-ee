import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GuiaRemisionService } from '../guia-remision.service';
import { GuiaRemisionModel } from '../guia-remision-model';
import swal from 'sweetalert2';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { isUndefined } from 'util';

@Component({
  selector: 'app-actualiza-numero-guia',
  templateUrl: './actualiza-numero-guia.component.html',
  styleUrls: ['./actualiza-numero-guia.component.css'],
  providers : [GuiaRemisionService,CrudHttpClientServiceShared]
})
export class ActualizaNumeroGuiaComponent implements OnInit {

  anno:number;
  numeroEntrega:number = 1;
  codigoModular:string = "";
  numeroGuia:string="";
  flagExiste:boolean = false;

  guiaRemisionModel:GuiaRemisionModel;
  @ViewChild("codigoModularId") trgCodigoModularFocusEl: ElementRef;
  @ViewChild("nroGuiaId") trgNroGuiaIdFocusEl: ElementRef;

  constructor(private guiaRemisionService:GuiaRemisionService, private crudHttpClientServiceShared:CrudHttpClientServiceShared ) { }

  ngOnInit() {

    let d = new Date();
    this.anno = d.getFullYear();

    this.numeroEntrega =parseInt( localStorage.getItem("numeroEntrega"));
    this.clickPestana1();


  }

  buscarCodigoModular(){
    if(this.codigoModular == "" || isUndefined(this.codigoModular)){
      return ;
    }
    this.guiaRemisionService.getGuiaRemisionPorCodigoModularJson(this.anno,this.numeroEntrega, this.codigoModular)
      .subscribe( res=> {
          
          if(res == null){
            swal('No existe el codigo modular');
            return ;
          }
          this.flagExiste = true;
          this.guiaRemisionModel = new GuiaRemisionModel(res.idGuiaRemision001,res.serie, res.numero, res.numeroFisico, res.fechaEmision,res.proveedorcliente,res.puntoPartida,res.puntoLlegada,res.requerimientoVolumen001,res.vehiculo,res.chofer,res.transportista,res.estado,res.sumaPesoTotal,res.ordenPorItem);
          this.numeroGuia = this.guiaRemisionModel.numeroFisico;
          console.log(this.guiaRemisionModel);

          setTimeout( ()=>{
            this.trgNroGuiaIdFocusEl.nativeElement.focus();
          },500 )
        })

  }

  update(){
    if(this.numeroGuia == "" || isUndefined(this.numeroGuia)){
      return ;
    }

    this.guiaRemisionModel.numeroFisico = this.numeroGuia;

    this.crudHttpClientServiceShared.update(this.guiaRemisionModel,"guiaremision","update")
    .subscribe( res=>{
      swal({
        position: 'top-end',
        type: 'success',
        title: 'Grabacion correcta',
        showConfirmButton: false,
        timer: 500
      });

      this.numeroGuia = "";
      this.codigoModular = "";
      setTimeout(()=>{
        this.trgCodigoModularFocusEl. nativeElement.focus();
      },1000);
  
      
      

    },
    error=>{
      swal("Error","El numero de guia ya fue registrado");
 
    }
  )

  }

  onKeydown(event) {
    
    if (event.key === "Tab" || event.key === "Enter" ) {
      this.buscarCodigoModular();
    }//validacion
  }

  clickPestana1(){
    setTimeout( ()=> {
      this.trgCodigoModularFocusEl.nativeElement.focus();
    },500 )
  }

  onSetFocusCodigoModular() {
    setTimeout(()=>{
     this.trgCodigoModularFocusEl.nativeElement.focus();
   },100);
 }
}
