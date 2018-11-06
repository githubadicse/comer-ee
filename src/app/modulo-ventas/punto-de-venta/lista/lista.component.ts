import { Component, OnInit } from '@angular/core';
import { PuntoDeVentaModel } from '../punto-de-venta-model';
import { ConfirmationService, Message } from 'primeng/primeng';
import { SharedService } from '../../../shared/servicio/shared.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers : [ConfirmationService,SharedService]
})
export class ListaComponent implements OnInit {
  show: boolean = true
  msgs: Message[] = [];

  public puntoVentaModel:PuntoDeVentaModel;
  public puntoVentasModel:PuntoDeVentaModel[];
  
  public titulo:string = "Puntos de venta";

 //-comandos obligatorios para la paginacion-//
 private msgPopup: Message[] = [];
 public blocked: boolean;

 public showPanelBuscarFlag: boolean = false;

 public filterPage: Object;
 public displayModal: boolean = false;
 public refreshPage: boolean = false;
 
 //-----------------------------------------//
  constructor(private confirmationService: ConfirmationService,
    private sharedService: SharedService) { }

  ngOnInit() {
  }

  filter(e) {
    this.filterPage = JSON.stringify(e.filters);
  }
  refreshModel(e) {
    this.puntoVentasModel = e;
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


  confirm(e) {
    let id = e.idpuntoventa;
    this.confirmationService.confirm({
        message: 'ESTA SEGURO DE ELIMINAR EL REGISTRO : ' + e.dscpuntoventa + '? ',
        
        accept: () => {
            //Actual logic to perform a confirmation
            this.sharedService.delete(id,"puntoventa","delete")
              .subscribe(
                res => {
             /*     if(res.success){
                  this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
                 }else{
                  this.msgs = [{severity:'info', summary:'Rejected', detail: res.msg}];
                 } */
                }
              )
        }
    });
}

}
