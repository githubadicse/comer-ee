import { Component, OnInit } from '@angular/core';
import { UnidadmedidaModel } from '../unidadmedida-model';
import { Message, ConfirmationService } from 'primeng/primeng';
import { SharedService } from '../../../../shared/servicio/shared.service';



@Component({
  selector: 'app-unidadmedida-lista',
  templateUrl: './unidadmedida-lista.component.html',
  styleUrls: ['./unidadmedida-lista.component.css'],
  providers : [ConfirmationService,SharedService]
})
export class UnidadmedidaListaComponent implements OnInit {
  public unidamedidaModel:UnidadmedidaModel;
  public unidadmedidasModel:UnidadmedidaModel[];

  show: boolean = true
  msgs: Message[] = [];


  public titulo: string = "Marcas";

  //-comandos obligatorios para la paginacion-//
  private msgPopup: Message[] = [];
  public blocked: boolean;

  public showPanelBuscarFlag: boolean = false;

  public filterPage: Object;
  public displayModal: boolean = false;
  public refreshPage: boolean = false;
  constructor(

    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  filter(e) {
    this.filterPage = JSON.stringify(e.filters);
  }
  
  refreshModel(e) {
    this.unidadmedidasModel = e;
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
    let id = e.idmarca;
    this.confirmationService.confirm({
      message: 'ESTA SEGURO DE ELIMINAR EL REGISTRO : ' + e.dscunidadmedida + '? ',

      accept: () => {
        //Actual logic to perform a confirmation
        this.sharedService.delete(id, "marca", "delete")
          .subscribe(
          res => {
      /*       if (res.success) {
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
