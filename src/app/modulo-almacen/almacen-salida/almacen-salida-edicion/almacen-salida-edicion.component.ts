import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ConfigService } from '../../../shared/config.service';
import { MomentDateAdapter } from '../../../shared/validators/MomentDateAdapter';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { LocalStorageManagerService } from '../../../shared/servicio/local-storage-manager.service';

import { AlmacenSalidaModel } from '../almacen-salida-model';
import { AlmacenSalidaDetalleModel } from '../almacen-salida-detalle-model';
import { ProductoModel } from '../../../modulo-sistema-config/tablas/producto/model/producto.model';
import { MSJ_SUCCESS_TOP_END } from '../../../shared/config.service.const';
import swal from 'sweetalert2';
import { AlmacenSalidaEdicionDialogComponent } from './almacen-salida-edicion-dialog/almacen-salida-edicion-dialog.component';

@Component({
  selector: 'ad-almacen-salida-edicion',
  templateUrl: './almacen-salida-edicion.component.html',
  styleUrls: ['./almacen-salida-edicion.component.css'],
  providers: [
    ConfigService,
    MomentDateAdapter
  ]
})
export class AlmacenSalidaEdicionComponent implements OnInit {
 
  showChild: boolean = false;
  procesando: boolean = false;  
  isUpdate: boolean = false; // si se actualiza, crea o modifica registro, notifica actulizacion con el evento "back"
  
  // id a modificar
  @Input('idRegistro') id: number;

  // se emite al dar click en el boton "atras". Emite el valor de isUpdate = si se actulizo o no para refrescar lista pricipal
  @Output('back') back:EventEmitter<boolean> = new EventEmitter(); 

  public idFilial:number=1;
  
  public salidaForm: FormGroup;

  public almacenSalidaModel: AlmacenSalidaModel = new AlmacenSalidaModel;

  public almacenSalidaDetallesModel: AlmacenSalidaDetalleModel[] = [];
  public almacenSalidaDetalleModel: AlmacenSalidaDetalleModel;

  // listar productos
  private keyLocalStorage: string = 'carrito'; // key datos del localstorage key = 'carrito';
  private countLocalStorageSuscription: Subscription;
  public ListProductosIngresar: any[] = [];
  public displayedColumns: string[] = ['#', 'Producto', 'Cantidad', '-'];
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

    this.salidaForm = this.formBuilder.group({
      idsalida001: ['0'],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      proveedorcliente: ['', Validators.required],
      nrodoc: [''],
      almacen: ['', Validators.required],
      periodoalmacen: [''],
      empleado: ['', Validators.required],
      glosa: [''],
      motivosalida: ['', Validators.required],
      salida002s: ['']
      // tipodocumento: ['', Validators.required],
      // seriedocproveedor: [''],
      // nrodocproveedor: [''],
      //condicionrelacioncompra:[''],
      //fechahorasys:[''],
      //com001 : [''],
      //traslado : [''],
      //ing002s : ['']

    });

  }

  newIngreso() {
    this.almacenSalidaModel = new AlmacenSalidaModel();
    this.almacenSalidaDetallesModel = [];    
    
    //this.ingresoForm.reset();
    this.localStorageManagerService.removeAllLocalSotrage(this.keyLocalStorage)
    this.buildForm();
  }

  create(){
    if (this.procesando) {return;}
    this.procesando = true;

    if (this.id) { this.update(); return;}

    // elimina el key "nomes" de periodoalmacen que no es parte del modelo orginal y se usa para mostrar el nombre del mes en el control  
    delete this.salidaForm.value.periodoalmacen["nommes"];
    
    let fechaMoment = this.salidaForm.controls['fecha'].value;
    let fecha = this.DateAdapter.format(this.salidaForm.controls['fecha'].value, 'DD/MM/YYYY');

   
    this.salidaForm.controls['fecha'].setValue(fecha);

    this.salidaForm.controls['salida002s'].setValue(this.almacenSalidaDetallesModel);
    let data = JSON.stringify(this.salidaForm.value);
    this.salidaForm.controls['fecha'].setValue(fechaMoment);

    // console.log(this.salidaForm.value); return;
    this.crudHttpClientServiceShared.create(data, "salida001", "create").subscribe(
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
      delete this.salidaForm.value.periodoalmacen["nommes"];    
      
      this.almacenSalidaModel = <AlmacenSalidaModel> this.salidaForm.value        
      this.almacenSalidaModel.fecha = this.configService.getDateToStringAllType(this.almacenSalidaModel.fecha);
      this.almacenSalidaModel.salida002s = this.almacenSalidaDetallesModel;
  
      const data = JSON.stringify(this.almacenSalidaModel);    
  
      this.crudHttpClientServiceShared.update(data, "salida001", "update").subscribe(
         res => {
              swal(MSJ_SUCCESS_TOP_END); 
              this.procesando=false; 
              this.isUpdate=true;
          },
         error => { console.log(error); this.procesando=false; }
        )
    }
    
    edit() {

      this.crudHttpClientServiceShared.edit(this.id,'salida001','findById').subscribe(
        res => {                        
          
          const data = <AlmacenSalidaModel>res.data;
          Object.keys(data).forEach(name => {
            if (this.salidaForm.controls[name]) {
              this.salidaForm.controls[name].patchValue(data[name]);
            }
          });
  
          const hora = data.hora.split(':'); // modifica hora de [hh:mm:ss] a [hh:mm]
          const fecha = this.configService.stringToDate(data.fecha,'DD/MM/YYYY','/');
          this.salidaForm.controls['fecha'].patchValue(fecha);
          this.salidaForm.controls['hora'].patchValue(hora[0]+':'+hora[1]);
  
          //ing002's
          this.insertLocalStorageFromEdit(data.salida002s);
  
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
    this.almacenSalidaDetallesModel = [];
    this.ListProductosIngresar.map(x => {
      let item = new AlmacenSalidaDetalleModel();   
      item.producto = x.producto;   
      item.cantidad = x.cantidad;      
      item.nrolote = x.lote
      this.almacenSalidaDetallesModel.push(item);
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
      lote: row ? row.lote : ''
    }
    
    const dialogRef = this.dialog.open(AlmacenSalidaEdicionDialogComponent,dialogConfig);

    // subscribe al cierre y obtiene los datos
    dialogRef.afterClosed().subscribe(
        data => {
          if (!data) return;
          this.localStorageManagerService.setDataLocalStorage(this.keyLocalStorage,data);
        }
    ); 
  }

  // EDITAR REGISTRO: carga productos ing002 al storage
  private insertLocalStorageFromEdit(ListSalida002s: AlmacenSalidaDetalleModel[]): void {
    this.localStorageManagerService.removeAllLocalSotrage(this.keyLocalStorage);

    ListSalida002s.map(x => {
      const rowInsertStorage = {'producto': x.producto, 'cantidad': x.cantidad};
      this.localStorageManagerService.setDataLocalStorage(this.keyLocalStorage,rowInsertStorage);
    });

  }

  public regresar(): void {    
    this.back.emit(this.isUpdate);
  }

  ////////////////////


  

}
