import { Component, OnInit } from '@angular/core';

import { Message } from "primeng/primeng";
import { MotivoIngresoModel } from '../motivo-ingreso-model';

@Component({
  selector: 'ad-motivo-ingreso-grid',
  templateUrl: './motivo-ingreso-grid.component.html',
  styleUrls: ['./motivo-ingreso-grid.component.css']
})
export class MotivoIngresoGridComponent implements OnInit {

  public titulo: string = "Motivo(s) de ingreso";

  public motivoIngresoModel: MotivoIngresoModel;
  public motivoIngresosModel: MotivoIngresoModel[] = [];


  //-comandos obligatorios para la paginacion-//
  private msgPopup: Message[] = [];
  public blocked: boolean;

  public showPanelBuscarFlag: boolean = false;

  public filterPage: Object;
  public displayModal: boolean = false;
  public refreshPage: boolean = false;
  //-----------------------------------------//  


  constructor() { }

  ngOnInit() {
  }


  filter(e) {
    this.filterPage = JSON.stringify(e.filters);
  }
  refreshModel(e) {
    this.motivoIngresosModel = e;
  }

  showPanelBuscar() {
    this.showPanelBuscarFlag = !this.showPanelBuscarFlag;
  }

}
