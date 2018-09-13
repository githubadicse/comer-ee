import { Component, OnInit, NgModule } from '@angular/core';

import { PeriodoalmacenService } from '../periodoalmacen.service';

import { PeriodoalmacenModel } from '../periodoalmacen-model';
import { SharedService } from '../../../shared/servicio/shared.service';
import { AlmacenModel } from '../../../modulo-sistema-config/tablas/almacen/almacen-model';





@Component({
  selector: 'ad-inicio-operaciones',
  templateUrl: './inicio-operaciones.component.html',
  styleUrls: ['./inicio-operaciones.component.css'],
  providers: [SharedService,PeriodoalmacenService]
})
export class InicioOperacionesComponent implements OnInit {

  public title: string = "Periodo inicio de actividades";
  public almacensModel: AlmacenModel[] = [];
  public almacenModel: AlmacenModel = new AlmacenModel();
  public periodoAlmacenModel:PeriodoalmacenModel= new PeriodoalmacenModel();
  public meses: any;
  public anno: number;
  public mes: any;
  public existeInicio:boolean = true;
  public msg:string="";
  public idalmcen:number = 0;

  constructor(private sharedService: SharedService,private periodoalmacenService:PeriodoalmacenService) { }

  ngOnInit() {
    this.getAllAlmacen();
    this.getMeses();
    this.mes = 1;
  }

  getMeses() {
    this.meses = this.sharedService.getMeses();
    debugger;

  }

  getAllAlmacen() {

    this.sharedService.getAll("almacen", "getall")
      .subscribe(
      result => {
        //this.almacensModel = result.data;
      }
      )

  }

  onChangeMes(e) {
    debugger;
    let x = this.mes ;

  }

  onChangeAlmacen(e){
    let x = this.almacenModel;
    this.findAllByIniciooperacionesEqualsAndAlmacenIdalmacenEquals();
    

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
        res => {
       /*    if(res.success){

          }{
            this.msg = res.msg;
          } */
        }
      )
    
  }

  findAllByIniciooperacionesEqualsAndAlmacenIdalmacenEquals(){
    let idalmacen = this.almacenModel.idalmacen;
  
    this.periodoalmacenService.findAllByIniciooperacionesEqualsAndAlmacenIdalmacenEquals(idalmacen)
      .subscribe(
        res => {
       /*    if(res.success){
              this.periodoAlmacenModel = res.data;
              this.existeInicio = true;
              this.msg = "YA FUE CREADO EL PERIODO PARA EL INICIO DE LAS OPERACIONES, PERIODO CREADO : " 
              + this.periodoAlmacenModel.mes + " - " + this.periodoAlmacenModel.anno;
          }else{
              this.existeInicio = false;
              this.msg = ""
          } */
        }
      )

  }

}
