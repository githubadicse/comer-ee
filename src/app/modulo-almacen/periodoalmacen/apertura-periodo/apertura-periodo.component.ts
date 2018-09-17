import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/primeng';

import { PeriodoalmacenService } from '../periodoalmacen.service';

import { PeriodoalmacenModel } from '../periodoalmacen-model';
import { SharedService } from '../../../shared/servicio/shared.service';
import { AlmacenModel } from '../../../modulo-sistema-config/tablas/almacen/almacen-model';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';




@Component({
  selector: 'ad-apertura-periodo',
  templateUrl: './apertura-periodo.component.html',
  styleUrls: ['./apertura-periodo.component.css'],
  providers: [ PeriodoalmacenService, CrudHttpClientServiceShared]
})
export class AperturaPeriodoComponent implements OnInit {


  public title: string = "Apertura de periodo";
  public almacensModel: AlmacenModel[] = [];
  public periodoalmacensModel:PeriodoalmacenModel[] = [] ;
  public almacenModel: AlmacenModel = new AlmacenModel();
  public mes;
  public anno;
  public idalmacen:any;

  //-comandos obligatorios para la paginacion-//
  private msgPopup: Message[] = [];
  public blocked: boolean;

  public showPanelBuscarFlag: boolean = false;

  public filterPage: Object;
  public displayModal: boolean = false;
  public refreshPage: boolean = false;

  public firstRow = 1;
  public rows = 10;
  public page = 0;
  public totalRecords = 0;
  public pageCount = 10;
  //-----------------------------------------// 

  constructor(private crudHttpClientServiceShared: CrudHttpClientServiceShared, private periodoalmacenService:PeriodoalmacenService

  ) { }


  ngOnInit() {
    this.idalmacen = ""
    debugger;
    this.getAllAlmacen();
    
  }


  onChangeAlmacen(e) {
    let x = this.almacenModel;
    this.idalmacen = x.idalmacen;
    this.getPeriodosPorAlmacenPaginado();
  }


  getAllAlmacen() {
    debugger;
    this.crudHttpClientServiceShared.getall("almacen", "getall")
      .subscribe(
      result => {
        debugger;
        this.almacensModel = result;
       
      }
      )

  }

  getPeriodosPorAlmacenPaginado(){
    let idalmacen = this.almacenModel.idalmacen;
    console.log("idalmacen : " + idalmacen);

    this.periodoalmacenService.getPaginationPorAlmacen(this.page,this.rows,this.idalmacen)
    .subscribe(
  /*     res => {
        this.totalRecords = res.data.totalElements;
        this.periodoalmacensModel = res.data.content;
        
      } */
    )

  }

  

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    let idalmacen = this.almacenModel.idalmacen;
    console.log("idalmacen : " + idalmacen);

    this.periodoalmacenService.getPaginationPorAlmacen(event.page,this.rows,this.idalmacen)
    .subscribe(
    /*   res => {
        this.totalRecords = res.data.totalElements;
        this.periodoalmacensModel = res.data.content;
        
      } */
    )    
    

 
}

}
