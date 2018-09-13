import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from "primeng/primeng";
import { AlmacenModel } from '../almacen-model';
import { SharedService } from '../../../../shared/servicio/shared.service';




@Component({
  selector: 'ad-almacen-lista',
  templateUrl: './almacen-lista.component.html',
  styleUrls: ['./almacen-lista.component.css'],
  providers : [ConfirmationService,SharedService]
})
export class AlmacenListaComponent implements OnInit {

  titulo: string = "Almacenes"
  show: boolean = true
  msgs: Message[] = [];

  public almacenModel: AlmacenModel;
  public almacensModel: AlmacenModel[] = [];

  //-comandos obligatorios para la paginacion-//
  public msgPopup: Message[] = [];
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
    this.almacensModel = e;
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


  ocultarLista() {
    this.show = false;
  }


  confirm(e) {
    let id = e.idcategoria;
    this.confirmationService.confirm({
      message: 'ESTA SEGURO DE ELIMINAR EL REGISTRO : ' + e.dsccategoria + '? ',

      accept: () => {
        //Actual logic to perform a confirmation
        this.sharedService.delete(id, "categoria", "delete")
          .subscribe(
          res => {
          /*   if (res.success) {
              this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
            } else {
              this.msgs = [{ severity: 'info', summary: 'Rejected', detail: res.msg }];
            } */
          }
          )
      }
    });
  }


}
