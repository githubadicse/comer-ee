import { Component, OnInit, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AlmacenIngresoService } from '../almacen-ingreso.service';



import { AlmacenIngresoModel } from '../almacen-ingreso-model';
import { AlmacenIngresoDetalleModel } from '../almacen-ingreso-detalle-model';

import { PeriodoalmacenService } from '../../periodoalmacen/periodoalmacen.service';
import { SharedService } from '../../../shared/servicio/shared.service';

import { EmpleadoModel } from '../../../modulo-cuenta-rr-hh/empleado/empleado-model';

import { TipodocumentoModel } from '../../../modulo-sistema-config/tipodocumento/tipodocumento-model';
import { PeriodoalmacenModel } from '../../periodoalmacen/periodoalmacen-model';
import { CodigobarraService } from '../../../modulo-sistema-config/tablas/codigobarra/codigobarra.service';
import { ProveedorclienteService } from '../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente.service';
import { ConfigService } from '../../../shared/config.service';
import { ProductoModel } from '../../../modulo-sistema-config/tablas/producto/model/producto.model';
import { CodigobarraModel } from '../../../modulo-sistema-config/tablas/codigobarra/codigobarra-model';
import { AlmacenModel } from '../../../modulo-sistema-config/tablas/almacen/almacen-model';
import { MotivoIngresoModel } from '../../../modulo-sistema-config/tablas/motivo-ingreso/motivo-ingreso-model';
import { ProveedorclienteModel } from '../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import swal from 'sweetalert2';
import { NumeradorModel } from '../../../modulo-sistema-config/tipodocumento/numerador.model';
import { LocalStorageManagerService } from '../../../shared/servicio/local-storage-manager.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlmacenIngresoEdicionDialogComponent } from './almacen-ingreso-edicion-dialog/almacen-ingreso-edicion-dialog.component';
import { MSJ_SUCCESS_TOP_END } from '../../../shared/config.service.const';

@Component({
  selector: 'ad-almacen-ingreso-edicion',
  templateUrl: './almacen-ingreso-edicion.component.html',
  styleUrls: ['./almacen-ingreso-edicion.component.css'],
  providers: [SharedService, AlmacenIngresoService, CodigobarraService, ProveedorclienteService,
    ConfigService,
    PeriodoalmacenService]
})

export class AlmacenIngresoEdicionComponent implements OnInit {
  showChild: boolean = false;
  showEdicion: boolean = true;
  procesando: boolean = false;
  msgPopup: any[];
  id: number;
  sub: any;

  public idFilial:number=1;
  
  public ingresoForm: any;
  public productosModel: ProductoModel[] = [];
  public productoModel: ProductoModel;
  public codigobarraModel: CodigobarraModel;

  public almacenIngresoModel: AlmacenIngresoModel;

  public almacenIngresoDetallesModel: AlmacenIngresoDetalleModel[] = [];
  public almacenIngresoDetalleModel: AlmacenIngresoDetalleModel;

  public almacensModel: AlmacenModel[] = [];
  public almacenModel: AlmacenModel;

  public empleadosModel: EmpleadoModel[] = [];
  public empleadoModel: EmpleadoModel;

  public motivoIngresosModel: MotivoIngresoModel[] = [];
  public motivoIngresoModel: MotivoIngresoModel;

  public proveedorclientesModel: ProveedorclienteModel[] = [];
  public proveedorclienteModel: ProveedorclienteModel;

  public tipodocumentosModel: TipodocumentoModel[] = [];
  public tipodocumentoModel: TipodocumentoModel;

  public periodoalmacenModel: PeriodoalmacenModel;

  cantidad: number = 0;
  nrolote: string = "";
  fechaVencimiento: Date = null;

  public msgs = [];

  es: any;

  

  @ViewChild('codigobarra') codigobarraControl: ElementRef;
  @ViewChild('cantidad_') cantidadControl: ElementRef;


  // listar productos
  private keyLocalStorage: string = 'carrito'; // key datos del localstorage key = 'carrito';
  private countLocalStorageSuscription: Subscription;
  public ListProductosIngresar: any[] = [];
  public displayedColumns: string[] = ['#', 'Producto', 'Lote', 'F.Vencimiento', 'Cantidad', '-'];
  private productoSeleccionado: ProductoModel;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private crudHttpClientServiceShared:CrudHttpClientServiceShared,
    private localStorageManagerService: LocalStorageManagerService,

    private dialog: MatDialog
  ) { 

    this.buildForm();
    this.loadDataLocalStorage();    
  }


  

  ngOnInit() {

    this.idFilial = this.configService.getIdFilialToken();

    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );



    
    if (this.id == 0) {
      this.newIngreso();

    } else {
      this.almacenIngresoModel = new AlmacenIngresoModel();

    };



    this.suscribeServiceLocalStorage();// susbcribe al servicio del localstorage
  }

  
  buildForm() {

    this.ingresoForm = this.formBuilder.group({
      iding001: ['0'],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      proveedorcliente: ['', Validators.required],
      nrodoc: [''],
      almacen: ['', Validators.required],
      periodoalmacen: [''],
      empleado: ['', Validators.required],
      glosa: [''],
      motivoingreso: ['', Validators.required],
      tipodocumento: ['', Validators.required],
      seriedocproveedor: [''],
      nrodocproveedor: ['']

    });

  }

  newIngreso() {
    this.almacenIngresoModel = new AlmacenIngresoModel();
    this.almacenIngresoDetallesModel = [];

  }




  create(){

    let fecha:string = (this.ingresoForm.controls['fecha'].value).format("DD/MM/YYYY");
    this.ingresoForm.controls['fecha'].setValue(fecha);

    let hora = this.ingresoForm.controls['hora'].value + ":00";
    this.ingresoForm.controls['hora'].setValue(hora);
        
    this.almacenIngresoModel =<AlmacenIngresoModel>this.ingresoForm.value; 
    this.almacenIngresoModel.ing002s = this.almacenIngresoDetallesModel;

    const data = JSON.stringify(this.almacenIngresoModel);

    this.crudHttpClientServiceShared.create(data, "ing001", "create").subscribe(
      res => {
      },
      error => console.log(error),
      () => {
        this.localStorageManagerService.removeAllLocalSotrage(this.keyLocalStorage);
        this.ingresoForm.reset();

        swal(MSJ_SUCCESS_TOP_END);        
      }
    )
  }



  edit() {

  }


  //// productos a agregar
  //////////////////////////

  private suscribeServiceLocalStorage() {
    
    this.initCountLocalStorage();

    this.countLocalStorageSuscription = this.localStorageManagerService.countItem$
    .subscribe(res =>{
      // cargar datos del carrito a la lista
      this.loadDataLocalStorage();
    });
  }

  private initCountLocalStorage () {
    this.localStorageManagerService.countInitLocalStorage(this.keyLocalStorage);
  }

  
  public deleteRowLocalStorage(index) {
    this.localStorageManagerService.removeItemLocalStorage(this.keyLocalStorage,index);
  }

  private loadDataLocalStorage() {
    // let lista:AlmacenIngresoDetalleModel[]=[];
    this.ListProductosIngresar = this.localStorageManagerService.getDataLocalStorage(this.keyLocalStorage) || [];
    
    //seteamos
    this.almacenIngresoDetallesModel = [];
    this.ListProductosIngresar.map(x => {
      let item = new AlmacenIngresoDetalleModel();
      item.fechavencimiento = x.fechavencimiento;
      item.cantidad = x.cantidad;
      item.nrolote = x.lote;
      item.producto = x.producto;      
      this.almacenIngresoDetallesModel.push(item);
    })

    console.log(this.almacenIngresoDetallesModel);
    // console.log(<AlmacenIngresoDetalleModel[]>this.ListProductosIngresar);
  }

  _getObjectProducto(event) {
    this.productoSeleccionado = event;
    this.openDialog();
    console.log(this.productoSeleccionado);
  }

  
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';

    // pasa ProductoModel selecionado
    dialogConfig.data = {
      producto: this.productoSeleccionado
    }
    
    const dialogRef = this.dialog.open(AlmacenIngresoEdicionDialogComponent,dialogConfig);

    // subscribe al cierre y obtiene los datos
    dialogRef.afterClosed().subscribe(
        data => {
          if (!data) return;
          this.localStorageManagerService.setDataLocalStorage(this.keyLocalStorage,data);
        }
    ); 
  }



  ////////////////////
}
