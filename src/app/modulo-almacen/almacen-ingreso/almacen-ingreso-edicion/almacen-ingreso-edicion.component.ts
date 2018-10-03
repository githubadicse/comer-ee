import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";


import { AlmacenIngresoModel } from '../almacen-ingreso-model';
import { ProductoModel } from '../../../modulo-sistema-config/tablas/producto/model/producto.model';
import { AlmacenIngresoDetalleModel } from '../almacen-ingreso-detalle-model';

import { ConfigService } from '../../../shared/config.service';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { LocalStorageManagerService } from '../../../shared/servicio/local-storage-manager.service';

import swal from 'sweetalert2';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlmacenIngresoEdicionDialogComponent } from './almacen-ingreso-edicion-dialog/almacen-ingreso-edicion-dialog.component';
import { MSJ_SUCCESS_TOP_END } from '../../../shared/config.service.const';
import { MomentDateAdapter } from '../../../shared/validators/MomentDateAdapter';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'ad-almacen-ingreso-edicion',
  templateUrl: './almacen-ingreso-edicion.component.html',
  styleUrls: ['./almacen-ingreso-edicion.component.css'],
  providers: [    
    ConfigService,
    MomentDateAdapter
  ]
})

export class AlmacenIngresoEdicionComponent implements OnInit {
  showChild: boolean = false;
  procesando: boolean = false;  
  isUpdate: boolean = false; // si se actualiza, crea o modifica registro, notifica actulizacion con el evento "back"
  
  // id a modificar
  @Input('idRegistro') id: number;

  // se emite al dar click en el boton "atras". Emite el valor de isUpdate = si se actulizo o no para refrescar lista pricipal
  @Output('back') back:EventEmitter<boolean> = new EventEmitter(); 

  public idFilial:number=1;
  
  public ingresoForm: FormGroup;

  public almacenIngresoModel: AlmacenIngresoModel = new AlmacenIngresoModel;

  public almacenIngresoDetallesModel: AlmacenIngresoDetalleModel[] = [];
  public almacenIngresoDetalleModel: AlmacenIngresoDetalleModel;

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
    if (this.procesando) {return;}
    this.procesando = true;

    if (this.id) { this.update(); return;}

    // elimina el key "nomes" de periodoalmacen que no es parte del modelo orginal y se usa para mostrar el nombre del mes en el control  
    delete this.ingresoForm.value.periodoalmacen["nommes"];
    
    let fechaMoment = this.ingresoForm.controls['fecha'].value;
    let fecha = this.DateAdapter.format(this.ingresoForm.controls['fecha'].value, 'DD/MM/YYYY');

   
    this.ingresoForm.controls['fecha'].setValue(fecha);

    this.ingresoForm.controls['ing002s'].setValue(this.almacenIngresoDetallesModel);
    let data = JSON.stringify(this.ingresoForm.value);
    this.ingresoForm.controls['fecha'].setValue(fechaMoment);

    this.crudHttpClientServiceShared.create(data, "ing001", "create").subscribe(
       res => {},
       error => { console.log(error); this.procesando = false;},
       () => {
         this.newIngreso();
         swal(MSJ_SUCCESS_TOP_END);        
         this.procesando = false;
         this.isUpdate=true;
       }
    )
  }

 
  update() {

    // elimina el key "nomes" de periodoalmacen que no es parte del modelo orginal y se usa para mostrar el nombre del mes en el control  
    delete this.ingresoForm.value.periodoalmacen["nommes"];    
    
    this.almacenIngresoModel = <AlmacenIngresoModel> this.ingresoForm.value        
    this.almacenIngresoModel.fecha = this.configService.getDateToStringAllType(this.almacenIngresoModel.fecha);
    this.almacenIngresoModel.ing002s = this.almacenIngresoDetallesModel;

    const data = JSON.stringify(this.almacenIngresoModel);    

    this.crudHttpClientServiceShared.update(data, "ing001", "update").subscribe(
       res => {
            swal(MSJ_SUCCESS_TOP_END); 
            this.procesando=false; 
            this.isUpdate=true;
          },
       error => { console.log(error); this.procesando=false; }
      )
  }


  edit() {

    this.crudHttpClientServiceShared.edit(this.id,'ing001','findById').subscribe(
      res => {                        
        
        const data = <AlmacenIngresoModel>res.data;
        Object.keys(data).forEach(name => {
          if (this.ingresoForm.controls[name]) {
            this.ingresoForm.controls[name].patchValue(data[name]);
          }
        });

        const hora = data.hora.split(':'); // modifica hora de [hh:mm:ss] a [hh:mm]
        const fecha = this.configService.stringToDate(data.fecha,'DD/MM/YYYY','/');
        this.ingresoForm.controls['fecha'].patchValue(fecha);
        this.ingresoForm.controls['hora'].patchValue(hora[0]+':'+hora[1]);

        //ing002's
        this.insertLocalStorageFromEdit(data.ing002s);

      })      

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

  public regresar(): void {    
    this.back.emit(this.isUpdate);
  }

  ////////////////////
}
