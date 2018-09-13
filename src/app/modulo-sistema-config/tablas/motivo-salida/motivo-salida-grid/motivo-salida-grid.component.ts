import { Component, OnInit } from '@angular/core';
import { Message } from "primeng/primeng";
import { MotivoSalidaModel } from '../motivo-salida-model';

@Component({
  selector: 'ad-motivo-salida-grid',
  templateUrl: './motivo-salida-grid.component.html',
  styleUrls: ['./motivo-salida-grid.component.css']
})
export class MotivoSalidaGridComponent implements OnInit {

  titulo:string = "Motivo(s) de salida"
  motivoSalidasModel:MotivoSalidaModel[]=[];
  motivoSalidaModel:MotivoSalidaModel;


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
    this.motivoSalidasModel = e;
  }

  showPanelBuscar() {
    this.showPanelBuscarFlag = !this.showPanelBuscarFlag;
  }


}
