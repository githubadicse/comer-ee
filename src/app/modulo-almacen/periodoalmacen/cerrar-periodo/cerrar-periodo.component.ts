import { Component, OnInit } from '@angular/core';

import { PeriodoalmacenModel } from '../periodoalmacen-model';

import { PeriodoalmacenService } from '../periodoalmacen.service';
import { SharedService } from '../../../shared/servicio/shared.service';
import { AlmacenModel } from '../../../modulo-sistema-config/tablas/almacen/almacen-model';




@Component({
  selector: 'ad-cerrar-periodo',
  templateUrl: './cerrar-periodo.component.html',
  styleUrls: ['./cerrar-periodo.component.css'],
  providers : [SharedService, PeriodoalmacenService]
})
export class CerrarPeriodoComponent implements OnInit {



  public title: string = "Cerrar Periodo";
  public almacensModel: AlmacenModel[] = [];
  public almacenModel: AlmacenModel = new AlmacenModel();
  public periodoAlmacenModel:PeriodoalmacenModel= new PeriodoalmacenModel();

  public anno: number;
  public mes: any;
  public existeAperturado:boolean = false;
  public msg:string="";
  public idalmcen:number = 0;

  constructor(private sharedService: SharedService,private periodoalmacenService:PeriodoalmacenService) { }

  ngOnInit() {
    this.getAllAlmacen();
  
 
  }


  getAllAlmacen() {

    this.sharedService.getAll("almacen", "getall")
      .subscribe(
    /*   result => {
        this.almacensModel = result.data;
      } */
      )

  }

  onChangeAlmacen(e){
    let x = this.almacenModel;
    this.findAllByAlmacenEqualsAndEstadoEquals();
    

  }

  generarPeriodoInicio(){
    this.periodoAlmacenModel.almacen = this.almacenModel;
    this.periodoAlmacenModel.idperiodoalmacen = 0;
    this.periodoAlmacenModel.mes = this.mes.id;
    this.periodoAlmacenModel.anno = this.anno;
    this.periodoAlmacenModel.estado = "A";
    this.periodoAlmacenModel.iniciooperaciones = 1;
    
    this.sharedService.save(this.periodoAlmacenModel,"periodoalmacen","save")
      .subscribe(
   /*      res => {
          if(res.success){

          }{
            this.msg = res.msg;
          }
        } */
      )
    
  }

  findAllByAlmacenEqualsAndEstadoEquals(){
    let idalmacen = this.almacenModel.idalmacen;
  
    this.periodoalmacenService.findAllByAlmacenEqualsAndEstadoEquals(idalmacen,"A")
      .subscribe(
        res => {
         /*  if(res.success){
              this.periodoAlmacenModel = res.data;
              this.existeAperturado = true;
              this.msg = "Periodo aperturado : " 
              + this.periodoAlmacenModel.mes + " - " + this.periodoAlmacenModel.anno;
          }else{
              this.existeAperturado = false;
              this.msg = res.msg;
          } */
        }
      )

  }

  procesoCerrarperiodo(){
    this.periodoalmacenService.procesoCierreperiodo(this.periodoAlmacenModel)
      .subscribe(
        resul => {
      /*     if(resul.success == true){
            alert("Proceso generado")
          }else{
            alert("Error");
          } */
        }
      )
  }


}
