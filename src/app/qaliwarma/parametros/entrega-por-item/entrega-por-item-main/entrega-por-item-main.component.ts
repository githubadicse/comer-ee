import { Component, OnInit } from '@angular/core';

import { EntregaPorItemService } from '../entrega-por-item.service';
import { EntregaPorItemModel } from '../entrega-por-item-model';
import swal from 'sweetalert2';
import { ChoferModel } from '../../chofer/chofer-model';
import { ChoferService } from '../../chofer/chofer.service';
import { VehiculoService } from '../../vehiculo/vehiculo.service';
import { VehiculoModel } from '../../vehiculo/vehiculo-model';
import { TransportistaService } from '../../transportista/transportista.service';
import { TransportistaModel } from '../../transportista/transportista-model';



import { PuntoPartidaService } from '../../punto-partida/punto-partida.service';
import { PuntoPartidaModel } from '../../punto-partida/punto-partida-model';

import { CrudHttpClientServiceShared } from '../../../../shared/servicio/crudHttpClient.service.shared';
import { ProveedorclienteModel } from '../../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model';
import { ProveedorclienteService } from '../../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente.service';


@Component({
  selector: 'app-entrega-por-item-main',
  templateUrl: './entrega-por-item-main.component.html',
  styleUrls: ['./entrega-por-item-main.component.css'],
  providers: [EntregaPorItemService, ChoferService, VehiculoService, TransportistaService, PuntoPartidaService, ProveedorclienteService, CrudHttpClientServiceShared] 
})
export class EntregaPorItemMainComponent implements OnInit {


  public anno: number;
  public numeroEntrega: number = 1;

  public entregaPoritemModel: EntregaPorItemModel;
  public entregaPoritemsModel: EntregaPorItemModel[] = [];

  public choferModel: ChoferModel;
  public chofersModel: ChoferModel[] = [];

  public vehiculosModel: VehiculoModel[] = [];
  public transportistasModel: TransportistaModel[] = [];

  public puntoPartidasModel:PuntoPartidaModel[] = [];

  public proveedorClientesModel:ProveedorclienteModel[] = [];
  selectedItem: any;
  es: any;
  constructor(private entregaPorItemService: EntregaPorItemService,
    private choferService: ChoferService,
    private vehiculoService: VehiculoService,
    private transportistaService: TransportistaService,
    private puntoPartidaService: PuntoPartidaService,
    private proveedorClienteService:ProveedorclienteService,
    private crudHttpClientServiceShared:CrudHttpClientServiceShared
  ) { }

  ngOnInit() {

    let f = new Date();
    this.anno = f.getFullYear();
    this.getItem();
    this.getChofers();
    this.getVehiculos();
    this.getTransportistas();
    this.getPuntoPartida();
    this.getProveedorCliente();

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }


  }

  update(e){
  
    this.crudHttpClientServiceShared.update(e,"entregaPorItem","update").subscribe(

     
      res=>{
        this.getItem()
        
        
      },
      error=>console.log(error),
      ()=>{
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Registro Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

  }

  sendConsulta(){
    this.getItem();
  }

  getItem() {

    this.entregaPorItemService.getItemByAnnoAndNumeroEntrega(this.anno, this.numeroEntrega).subscribe(
      
      res => {
        
        this.entregaPoritemsModel = res.map(item => {

          return new EntregaPorItemModel(item.idEntregaPorItem,
            item.itemEntrega,
            item.numeroEntrega,
            item.cerrado,
            item.inicioAtencion,
            item.finAtencion,
           
            item.proveedorcliente ==null? new ProveedorclienteModel():new ProveedorclienteModel(item.proveedorcliente.idproveedorcliente,item.proveedorcliente.razonsocial,
               item.proveedorcliente.representante,item.proveedorcliente.documentoidentificacion,item.proveedorcliente.nrodocumento,item.proveedorcliente.telefono, item.proveedorcliente.email, item.proveedorcliente.contacto1,
               item.proveedorcliente.contacto2 ) ,
            item.puntoPartida == null? new PuntoPartidaModel(): new PuntoPartidaModel(item.puntoPartida.idPuntoPartida,item.puntoPartida.direccion),
            item.vehiculo == null ? new VehiculoModel() : new VehiculoModel(item.vehiculo.idVehiculo, item.vehiculo.numeroPlaca , item.vehiculo.marcaVehiculo),
            item.chofer == null ? new ChoferModel() : new ChoferModel(item.chofer.idChofer, item.chofer.dni, item.chofer.numeroBrevete, item.chofer.nombres),
            item.transportista == null ? new TransportistaModel(0, new ProveedorclienteModel(0, "")) : new TransportistaModel(item.transportista.idTransportista, item.transportista.proveedorcliente))
        })

      },
      error => {
        swal(error);
      },
      () => {
        console.log(this.entregaPoritemsModel);

      }

    );
  }

 

  getChofers() {
    this.choferService.getAll().subscribe(
      res => {
        this.chofersModel = res.map(
          item => {
            return new ChoferModel(item.idChofer, item.dni, item.numeroBrevete, item.nombres);
          }
        )
      },
      error => {
        swal(error);
      },
      () => {
        console.log(this.chofersModel);
        this.chofersModel.sort(
          (a, b) => {
            if (a.nombres < b.nombres) {
              return -1;
            } else if (a.nombres > b.nombres) {
              return 1;
            } else {
              return 0;
            }
          }
        )

      }

    )
  }

  getVehiculos() {

    this.vehiculoService.getAll().subscribe(
      res => {
        this.vehiculosModel = res.map(
          item => {
            return new VehiculoModel( item.idVehiculo, item.numeroPlaca,item.marcaVehiculo);
          }
        )
      },
      error => {
        swal(error);
      },
      () => {
        console.log(this.vehiculosModel);

      }

    )
  }

  getTransportistas() {

    this.transportistaService.getall().subscribe(
      res => {
        this.transportistasModel = res.map(
          item => {
            return new TransportistaModel(item.idTransportista, item.proveedorcliente);
          }
        )
      },
      error => {
        swal(error);
      },
      () => {
        console.log(this.transportistasModel);
        this.transportistasModel.sort(
          (a, b) => {
            if (a.proveedorcliente.razonsocial < b.proveedorcliente.razonsocial) {
              return -1;
            } else if (a.proveedorcliente.razonsocial > b.proveedorcliente.razonsocial) {
              return 1;
            } else {
              return 0;
            }
          }
        )
      }
    )
  }


  getPuntoPartida() {

    this.puntoPartidaService.getall().subscribe(
      res => {
        this.puntoPartidasModel = res.map(
          item => {
            return new PuntoPartidaModel(item.idPuntoPartida,item.direccion);
          }
        )
      },
      error => {
        swal(error);
      },
      () => {
        console.log(this.puntoPartidasModel);

      }

    )
  }

  getProveedorCliente() {

    this.proveedorClienteService.getall().subscribe(
      res => {
      
        this.proveedorClientesModel = res.map(
          item => {
            return new ProveedorclienteModel(item.idproveedorcliente,item.razonsocial,item.representante,item.documentoidentificacion,item.nrodocumento,item.telefono,item.email,item.contacto1,item.contacto2) ;
          }
        )
      },
      error => {
        swal(error);
      },
      () => {
        console.log(this.proveedorClientesModel);
        this.proveedorClientesModel.sort(
          (a, b) => {
            if (a.razonsocial < b.razonsocial) {
              return -1;
            } else if (a.razonsocial > b.razonsocial) {
              return 1;
            } else {
              return 0;
            }
          }
        )
      }
    )
  }
}
