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
import { Moment } from 'moment';
import * as moment from 'moment';
import { MomentDateAdapter } from '../../../shared/validators/MomentDateAdapter';

@Component({
  selector: 'ad-almacen-ingreso-edicion',
  templateUrl: './almacen-ingreso-edicion.component.html',
  styleUrls: ['./almacen-ingreso-edicion.component.css'],
  providers: [SharedService, AlmacenIngresoService, CodigobarraService, ProveedorclienteService,
    ConfigService,
    PeriodoalmacenService,MomentDateAdapter]
})

export class AlmacenIngresoEdicionComponent implements OnInit {
  showChild: boolean = false;
  showEdicion: boolean = true;
  procesando: boolean = false;
  msgPopup: any[];
  id: number = 0;
  sub: any;

  public idFilial:number=1;
  
  public ingresoForm: any;
  public productosModel: ProductoModel[] = [];
  public productoModel: ProductoModel;
  public codigobarraModel: CodigobarraModel;

  public almacenIngresoModel: AlmacenIngresoModel = new AlmacenIngresoModel;

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

  public rowIndexCondirmDelete: number = null; // index de la fila a eliminar , para mostrar la barra de confirmarcion

  constructor(
    private formBuilder: FormBuilder,

    private configService: ConfigService,
    private crudHttpClientServiceShared:CrudHttpClientServiceShared,
    private localStorageManagerService: LocalStorageManagerService,

    private dialog: MatDialog,
    private DateAdapter: MomentDateAdapter
  ) { 

    // this.buildForm();
    this.loadDataLocalStorage();    
  }


  ngOnInit() {
    this.buildForm();
    this.idFilial = this.configService.getIdFilialToken();

        
    if (!this.id) {
      this.newIngreso();

    } else {
      // this.almacenIngresoModel = new AlmacenIngresoModel();
      this.edit();
    };

    this.suscribeServiceLocalStorage();// susbcribe al servicio del localstorage
  }

  
  buildForm() {

    // this.ingresoForm = this.formBuilder.group({
    //   iding001: ['0'],
    //   fecha: ['', Validators.required],
    //   hora: ['', Validators.required],
    //   proveedorcliente: ['', Validators.required],
    //   nrodoc: [''],
    //   almacen: ['', Validators.required],
    //   periodoalmacen: [''],
    //   empleado: ['', Validators.required],
    //   glosa: [''],
    //   motivoingreso: ['', Validators.required],
    //   tipodocumento: ['', Validators.required],
    //   seriedocproveedor: [''],
    //   nrodocproveedor: ['']
    // });

    this.ingresoForm = this.formBuilder.group({
      iding001: ['0'],
      fecha: [''],
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
      nrodocproveedor: [''],
      ing002s:['']

    });

  }

  newIngreso() {
    this.almacenIngresoModel = new AlmacenIngresoModel();
    this.almacenIngresoDetallesModel = [];    
    
    //this.ingresoForm.reset();
    this.localStorageManagerService.removeAllLocalSotrage(this.keyLocalStorage)
    this.buildForm();
  }





  create(){

    // elimina el key "nomes" que no es parte del modelo orginal y se usa para mostrar el nombre del mes en el control
    let periodo = this.ingresoForm.value.periodoalmacen;
    delete periodo["nommes"];
    
    let fechaMoment = this.ingresoForm.controls['fecha'].value;
    let fecha = this.DateAdapter.format(this.ingresoForm.controls['fecha'].value, 'DD/MM/YYYY');

   
    this.ingresoForm.controls['fecha'].setValue(fecha);

    this.ingresoForm.controls['ing002s'].setValue(this.almacenIngresoDetallesModel);
    let data = JSON.stringify(this.ingresoForm.value);
    this.ingresoForm.controls['fecha'].setValue(fechaMoment);

    this.crudHttpClientServiceShared.create(data, "ing001", "create").subscribe(
       res => {
       },
       error => console.log(error),
       () => {
         this.newIngreso();
         swal(MSJ_SUCCESS_TOP_END);        
       }
    )
  }


  
  update() {

    // this.almacenIngresoModel =<AlmacenIngresoModel>this.ingresoForm.value; 
    // let fecha = this.configService.getDateString(this.almacenIngresoModel.fecha);
    // let hora = this.configService.getHoraString(this.almacenIngresoModel.hora);


    // this.almacenIngresoModel.fecha = fecha;
    // this.almacenIngresoModel.hora = hora;
    // this.almacenIngresoModel.periodoalmacen = this.periodoalmacenModel;
    // this.almacenIngresoModel.fechaRegistroSystema = null;

    //this.almacenIngresoModel.ing002s = this.almacenIngresoDetallesModel;

    // let periodo = this.ingresoForm.value.periodoalmacen;
    // delete periodo["nommes"];    
    delete this.ingresoForm.value.periodoalmacen["nommes"];

    this.almacenIngresoModel =<AlmacenIngresoModel>this.ingresoForm.value;     
    const fecha = this.configService.getDateString(this.almacenIngresoModel.fecha);
    this.almacenIngresoModel.fecha = fecha;

    const horaFormControl = this.ingresoForm.controls['hora'].value;
    const hora = horaFormControl.split(':').length === 2 ? horaFormControl + ":00" : horaFormControl;
    this.almacenIngresoModel.hora = hora;

    // this.almacenIngresoModel =<AlmacenIngresoModel>this.ingresoForm.value; 
    this.almacenIngresoModel =<AlmacenIngresoModel>this.ingresoForm.value; 
    this.almacenIngresoModel.ing002s = this.almacenIngresoDetallesModel; 
    console.log('update', this.almacenIngresoModel);

    const data = JSON.stringify(this.almacenIngresoModel);

    this.crudHttpClientServiceShared.update(data, "ing001", "update")
      .subscribe(
      res => {
        // this.msgPopup = [];
        // this.msgPopup.push({ severity: 'success', summary: 'Aviso', detail: 'Registro Grabado !' });
        swal(MSJ_SUCCESS_TOP_END);
      })
      // error => {
      //   console.log(error);
      // })
      // () => {
      //   this.almacenIngresoDetallesModel = [];
      //   this.almacenIngresoModel = new AlmacenIngresoModel();
      //   this.buildForm();
      // })
  }


  edit() {

  }

    //// productos a agregar
  //////////////////////////

  private suscribeServiceLocalStorage(): void {
    
    this.initCountLocalStorage();

    this.countLocalStorageSuscription = this.localStorageManagerService.countItem$
    .subscribe(res =>{
      // cargar datos del carrito a la lista
      this.loadDataLocalStorage();
    });
  }

  private initCountLocalStorage (): void {
    this.localStorageManagerService.countInitLocalStorage(this.keyLocalStorage);
  }

  
  public deleteRowLocalStorage(index): void {
    this.rowIndexCondirmDelete= null;
    this.localStorageManagerService.removeItemLocalStorage(this.keyLocalStorage,index);
  }

  private loadDataLocalStorage(): void {
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

    // console.log(this.almacenIngresoDetallesModel);
    // console.log(<AlmacenIngresoDetalleModel[]>this.ListProductosIngresar);
  }

  _getObjectProducto(event): void {
    this.productoSeleccionado = event;
    this.openDialog();
    console.log(this.productoSeleccionado);
  }

  _getObJectProductoListIngresar(row: any): void {
    this.productoSeleccionado = <ProductoModel>row.producto;
    this.openDialog(row);
    console.log(this.productoSeleccionado);
  }

  
  // row: el array que contiene cantidad, fv, lote , etc, es obligatorio en el caso de editar
  openDialog(row: any = null) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';

    // pasa ProductoModel selecionado
    dialogConfig.data = {
      producto: this.productoSeleccionado,
      cantidad: row ? row.cantidad : '',
      lote: row ? row.lote : '',
      fechavencimiento: row ? row.fechavencimiento : ''
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

  // EDITAR REGISTRO: carga productos ing002 al storage
  private insertLocalStorageFromEdit(ListIng002: AlmacenIngresoDetalleModel[]): void {
    this.localStorageManagerService.removeAllLocalSotrage(this.keyLocalStorage);

    ListIng002.map(x => {
      const rowInsertStorage = {'producto': x.producto, 'cantidad': x.cantidad, 'lote': x.nrolote, 'fechavencimiento': x.fechavencimiento};
      this.localStorageManagerService.setDataLocalStorage(this.keyLocalStorage,rowInsertStorage);
    });

  }




  ////////////////////
}
