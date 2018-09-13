import { Component, OnInit } from '@angular/core';

import { Message, ConfirmationService } from "primeng/primeng";

import { ProveedorclienteModel } from '../proveedorcliente-model';
import swal from 'sweetalert2';

import { isUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { ProveedorclienteService } from '../proveedorcliente.service';
import { CrudHttpClientServiceShared } from '../../../../shared/servicio/crudHttpClient.service.shared';


@Component({
  selector: 'ad-proveedorcliente-lista',
  templateUrl: './proveedorcliente-lista.component.html',
  styleUrls: ['./proveedorcliente-lista.component.css'],
  providers: [ ConfirmationService,CrudHttpClientServiceShared, ProveedorclienteService ]
})
export class ProveedorclienteListaComponent implements OnInit {
 dataPagination: any;
  sub: any;
  flagRefresh: boolean = false;
  
  show: boolean = true;
  msgs: Message[] = [];

  public titulo: string = "Proveedor / Cliente";
  public proveedorclienteModel: ProveedorclienteModel;
  public proveedorclientesModel: ProveedorclienteModel[] ;

//-comandos obligatorios para la paginacion-//
  private msgPopup: Message[] = [];
  public blocked: boolean;

  public showPanelBuscarFlag: boolean = false;

  public filterPage: Object;
  public displayModal: boolean = false;
  public refreshPage: boolean = false;
  //-----------------------------------------//  

  constructor(private crudHttpClientServiceShared: CrudHttpClientServiceShared, private activateRoute:ActivatedRoute ) { 

  }

  ngOnInit() {
  }

  filter(e) {
    this.filterPage = JSON.stringify(e.filters);
    this.refreshModel(this.dataPagination, true);
  }

  refreshModel(e, flagFilter?, currentPage?) {
    //debugger;
    this.flagRefresh = false;
    
    if (flagFilter) {
      e.currentPage = 0;
    }

    this.dataPagination = e;
    this.crudHttpClientServiceShared.getPagination(e.currentPage == null ? 0 : e.currentPage, e.rowsForPage == null ? 10 : e.rowsForPage, "asc", e.orden, this.filterPage, e.controller, "pagination", e.paramsExtra)
      .subscribe(
        res => {
          this.proveedorclientesModel = res.data;
          e.getTotalPages(res.totalCount, e.rowsForPage == null ? 10 : e.rowsForPage);
        }
      );


  }

  showPanelBuscar() {
    this.showPanelBuscarFlag = !this.showPanelBuscarFlag;
  }

  onActivate() {
    console.log("Activate outlet list");
    this.show = false;
  }

  onDeactivate() {
    console.log("Deactivate outlet list");
    this.sub = this.activateRoute.params.subscribe(
      params => {
      
        if( isUndefined(params['flagRefreshReturn']) ){
          return;
        }
        let flagRefresh  = JSON.parse(params['flagRefreshReturn']) ;
        this.refreshPage = flagRefresh;
       
        if(this.refreshPage){
          this.refreshModel(this.dataPagination);
        }
        this.refreshPage=false;
        
      }
    )
    this.show = true;
  }

  ocultarLista() {
    this.show = false;

  }

  delete(e) {

    swal({
      title: 'Esta Seguro?',
      text: "Esta seguro de eliminar el cliente : " + e.razonsocial,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {

      if (result.value) {
        this.crudHttpClientServiceShared.delete(e.idProveedorCliente, "proveedorCliente", "delete").subscribe(
          res => {
            swal(
              'Deleted!',
              'El registro fue eliminado.',
              'success'
            )
            this.refreshPage = !this.refreshPage;
          },
          error => {

            swal(
              'Deleted!',
              'El Registro No se elimino.' + error,
              'error'
            )
          }
        )

      }
    })
  }
  

}
