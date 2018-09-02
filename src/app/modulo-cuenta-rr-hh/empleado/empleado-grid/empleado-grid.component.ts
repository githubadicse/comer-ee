import { Component, OnInit } from '@angular/core';

import { Message, ConfirmationService } from 'primeng/primeng';

import { EmpleadoModel } from '../empleado-model';
import { UsuarioEmpleadoModel } from '../../../modulo-sistema-config/usuario/usuario-empleado-model';
import { SharedService } from '../../../shared/servicio/shared.service';


@Component({
  selector: 'ad-empleado-grid',
  templateUrl: './empleado-grid.component.html',
  styleUrls: ['./empleado-grid.component.css'],
  providers : [SharedService,ConfirmationService]

})
export class EmpleadoGridComponent implements OnInit {
  public show: boolean = true;
  public msgs: Message[] = [];
  public titulo:string="Empleados";

  public empleadosModel:EmpleadoModel[] = [];
  public empleadoModel:EmpleadoModel;

  public usuarioEmpleaadosModel:UsuarioEmpleadoModel[] = [];
  public usuarioEmpleadoModel:UsuarioEmpleadoModel;


   //-comandos obligatorios para la paginacion-//
   private msgPopup: Message[] = [];
   public blocked: boolean;
 
   public showPanelBuscarFlag: boolean = false;
 
   public filterPage: Object;
   public displayModal: boolean = false;
   public refreshPage: boolean = false;
   //-----------------------------------------//


   displayedColumns = ['idempleado', 'nomempleado', 'dni', 'email', 'estado', 'action'];
  constructor(private sharedService:SharedService, private confirmationService: ConfirmationService,) { }

  ngOnInit() {
  }


  filter(e) {
    this.filterPage = JSON.stringify(e.filters);
  }
  refreshModel(e) {
    this.empleadosModel = e;
  }

  showPanelBuscar() {
    this.showPanelBuscarFlag = !this.showPanelBuscarFlag;
  }
  onActivate() {
    console.log("Activate outlet main");
    this.show = false;

  }  

  onDeactivate() {
    console.log("Deactivate outlet main");
    this.show = true;
   

  }


  ocultarLista(){
    this.show = false;
  }



}
