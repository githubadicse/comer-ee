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
    private router: Router,
    private sharedService: SharedService,
    private almacenIngresoService: AlmacenIngresoService,
    private codigobarraService: CodigobarraService,
    private proveedorclienteService: ProveedorclienteService,
    private periodoalmacenService: PeriodoalmacenService,
    private configService: ConfigService,
    private changeDetectorRef: ChangeDetectorRef,
    private crudHttpClientServiceShared:CrudHttpClientServiceShared,
    private localStorageManagerService: LocalStorageManagerService,

    private dialog: MatDialog
  ) { 

    this.buildForm();
    this.loadDataLocalStorage();    
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  doAsyncTask() {
    let error = false;
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Inicio carga...");
        this.getAllAlmacen()
        this.getAllEmpleado();
        this.getAllMotivoIngreso();
        this.getAllTipoDocumento();
        if (error) {
          reject();
        } else {
          resolve();
          console.log("Fin carga");
          if (this.id > 0) {

            this.edit();
          }


        }
      }, 300);
    });
    return promise;
  }

  ngOnInit() {

    this.idFilial = this.configService.getIdFilialToken();

    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

    
    if (this.id == 0) {
      this.newIngreso();

    } else {
      this.almacenIngresoModel = new AlmacenIngresoModel();

    };

    this.doAsyncTask().then(
      (val) => console.log(val),
      (err) => console.error(err)
    )

    setTimeout(() => {
      //this.codigobarraControl.nativeElement.focus();
    }, 500);


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

  getPeriodoAlmacen(){
    let almacen =  this.ingresoForm.get('almacen').value;
    let periodoalmacenModel = new PeriodoalmacenModel(1,9,2018,"A",1, almacen);
    return periodoalmacenModel;
  }


  create(){
    let periodo = this.getPeriodoAlmacen();

    //tipo documento provisional
    // let numeradors = [new NumeradorModel(1,1,1,null)]
    // let tipodocumento = new TipodocumentoModel(1,"FACTURA","01", numeradors )

    let fecha:string = (this.ingresoForm.controls['fecha'].value).format("DD/MM/YYYY");
    this.ingresoForm.controls['fecha'].setValue(fecha);
    // this.ingresoForm.controls['periodoalmacen'].setValue(periodo);
    // this.ingresoForm.controls['tipodocumento'].setValue(tipodocumento);

    let hora = this.ingresoForm.controls['hora'].value + ":00";
    this.ingresoForm.controls['hora'].setValue(hora);

    this.almacenIngresoModel =<AlmacenIngresoModel>this.ingresoForm.value; 
    this.almacenIngresoModel.ing002s = this.almacenIngresoDetallesModel;
    // let data = JSON.stringify(this.ingresoForm.value);
    console.log(this.almacenIngresoModel);
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

  addCarrito() {

    this.msgs = [];
    let rtn = false;
    let tipoaviso = 'warn';


    if (this.productoModel == null) {
      this.msgs.push({ severity: tipoaviso, summary: 'Aviso', detail: 'Debe indicar un producto' });
      rtn = true;
    } else {
      if (this.productoModel.exigelote && this.nrolote == "") {
        this.msgs.push({ severity: tipoaviso, summary: 'Aviso', detail: 'El producto exige que especifique el nro de lote' });
        rtn = true;
      }
      if (this.productoModel.exigevencimiento && this.fechaVencimiento == null) {
        this.msgs.push({ severity: tipoaviso, summary: 'Aviso', detail: 'El producto exige que especifique la fecha de vencimiento' });
        rtn = true;
      }
    }
    if (this.cantidad == 0) {
      this.msgs.push({ severity: tipoaviso, summary: 'Aviso', detail: 'La cantidad debe ser mayor a cero (0)' });
      rtn = true;
    }
    if (rtn) {
      return;
    }


    this.almacenIngresoDetalleModel = new AlmacenIngresoDetalleModel();


    this.almacenIngresoDetalleModel.producto = this.productoModel;
    this.almacenIngresoDetalleModel.cantidad = this.cantidad;
    this.almacenIngresoDetalleModel.nrolote = this.nrolote;
    this.almacenIngresoDetalleModel.fechavencimiento = this.fechaVencimiento;

    this.almacenIngresoModel.ing002s.push(this.almacenIngresoDetalleModel);

    this.almacenIngresoModel.ing002s = this.almacenIngresoModel.ing002s.slice();

    this.codigobarraControl.nativeElement.value = "";
    this.productoModel = null;
    this.cantidad = 0;
    this.nrolote = "";
    this.fechaVencimiento = null;
    this.almacenIngresoDetalleModel = null;

    setTimeout(() => {
      this.codigobarraControl.nativeElement.focus();
    }, 500);

  }

  getAllAlmacen() {

    this.sharedService.getAll("almacen", "getall")
      .subscribe(
      result => {
        //this.almacensModel = result.data;
      }
      )

  }

  getAllEmpleado() {

    this.sharedService.getAll("empleado", "getall")
      .subscribe(
      result => {
        //this.empleadosModel = result.data;
      }
      )

  }


  getAllMotivoIngreso() {

    this.sharedService.getAll("motivoingreso", "getall")
      .subscribe(
      result => {
        //this.motivoIngresosModel = result.data;
      }
      )

  }


  getAllTipoDocumento() {
    this.sharedService.getAll("tipodocumento", "getall")
      .subscribe(

      result => {
        //this.tipodocumentosModel = result.data;
      }
      )
  }

  searchProveedorCliente(event) {

    let query = event.query;

    if (query == undefined) {
      query = "";
    }

    //  this.proveedorclienteService.getProveedorclienteFilter(query)
    //   .subscribe(
    //   res => {
    //     this.proveedorclientesModel = res.data;
    //   }
    //   ) 

  }

  getPeriodoAlmacenByEstado() {

    let date = new Date(this.almacenIngresoModel.fecha.toString());

    let anno = date.getFullYear()
    let mes = date.getMonth() + 1;
    let idalmacen = this.almacenIngresoModel.almacen.idalmacen;

    this.periodoalmacenService.getPeriodoAlmacenByEstado(anno, mes, 'A', idalmacen)
      .subscribe(
      res => {
        debugger;
        let success = false;
       /*  if (res.success) {
          success = true;
          this.periodoalmacenModel = res.data;
          this.save();
        } else {
          success = false;
          this.msgPopup = [];
          this.msgPopup.push({ severity: 'error', summary: 'Aviso Periodo Invalido', detail: 'El registro no se grabo !' });
        } */



      },
      error => {

      },
      () => {


      }
      )
  }

  beforeSave() {
    let build = this.ingresoForm;

    this.almacenIngresoModel.almacen = build.controls['almacen'].value;//
    this.almacenIngresoModel.empleado = build.controls['empleado'].value;
    this.almacenIngresoModel.fecha = build.controls['fecha'].value;
    this.almacenIngresoModel.hora = build.controls['hora'].value;
    this.almacenIngresoModel.motivoingreso = build.controls['motivoingreso'].value;

    this.almacenIngresoModel.periodoalmacen = build.controls['periodoalmacen'].value;
    this.almacenIngresoModel.proveedorcliente = build.controls['proveedorcliente'].value;
    this.almacenIngresoModel.nrodocproveedor = build.controls['nrodocproveedor'].value;
    this.almacenIngresoModel.seriedocproveedor = build.controls['seriedocproveedor'].value;
    this.almacenIngresoModel.tipodocumento = build.controls['tipodocumento'].value;

    this.getPeriodoAlmacenByEstado();

  }

  edit() {
    this.sharedService.findById(this.id, "ing001", "findById")
      .subscribe(
      result => {

        //this.almacenIngresoModel = result.data;


        let date = this.configService.stringToDate(this.almacenIngresoModel.fecha, "dd/MM/yyyy", "/");
        //this.almacenIngresoModel.fecha = date.toString();

        let hora = this.configService.stringToTime(this.almacenIngresoModel.hora, "hh:mm", ":");

        //this.almacenIngresoDetallesModel = this.almacenIngresoModel.ing002s;
        this.almacenIngresoModel.ing002s = this.almacenIngresoModel.ing002s.slice();
        //this.ingresoForm.setValue(this.almacenIngresoModel);

        this.ingresoForm.controls["iding001"].setValue(this.almacenIngresoModel.iding001);
        this.ingresoForm.controls["fecha"].setValue(date);
        this.ingresoForm.controls["hora"].setValue(hora);
        this.ingresoForm.controls["proveedorcliente"].setValue(this.almacenIngresoModel.proveedorcliente);
        this.ingresoForm.controls["nrodoc"].setValue(this.almacenIngresoModel.nrodoc);
        this.ingresoForm.controls["almacen"].setValue(this.almacenIngresoModel.almacen);
        this.ingresoForm.controls["periodoalmacen"].setValue(this.almacenIngresoModel.periodoalmacen);
        this.ingresoForm.controls["empleado"].setValue(this.almacenIngresoModel.empleado);
        this.ingresoForm.controls["glosa"].setValue(this.almacenIngresoModel.glosa);
        this.ingresoForm.controls["motivoingreso"].setValue(this.almacenIngresoModel.motivoingreso);
        this.ingresoForm.controls["tipodocumento"].setValue(this.almacenIngresoModel.tipodocumento);
        this.ingresoForm.controls["seriedocproveedor"].setValue(this.almacenIngresoModel.seriedocproveedor);
        this.ingresoForm.controls["nrodocproveedor"].setValue(this.almacenIngresoModel.nrodocproveedor);






      }
      )
  }

  save() {

    let fecha = this.configService.getDateString(this.almacenIngresoModel.fecha);
    let hora = this.configService.getHoraString(this.almacenIngresoModel.hora);


    this.almacenIngresoModel.fecha = fecha;
    this.almacenIngresoModel.hora = hora;
    this.almacenIngresoModel.periodoalmacen = this.periodoalmacenModel;
    this.almacenIngresoModel.fechahorasys = null;

    //this.almacenIngresoModel.ing002s = this.almacenIngresoDetallesModel;

    this.sharedService.save(this.almacenIngresoModel, "ing001", "save")
      .subscribe(
      res => {
        this.msgPopup = [];
        this.msgPopup.push({ severity: 'success', summary: 'Aviso', detail: 'Registro Grabado !' });

      },
      error => {
        alert(error);
      },
      () => {
        this.almacenIngresoDetallesModel = [];
        this.almacenIngresoModel = new AlmacenIngresoModel();
        this.buildForm();
      }





      )
  }




  getKardex(e) {

    let idalmacen = this.almacenIngresoModel.almacen.idalmacen
    let idproducto = e.producto.idproducto;
    let idperiodoalmacen = this.almacenIngresoModel.periodoalmacen.idperiodoalmacen;

    let dato = { idalmacen: idalmacen, idproducto: idproducto, idperiodoalmacen: idperiodoalmacen };

    this.router.navigate(['./kardex', dato], { relativeTo: this.route });

    //this.router.navigate(['../'], { relativeTo: this.route });

  }




  onActivate() {
    console.log("Activate outlet edicion, osea se muestra el kardex");
    this.showEdicion = false;
    // this.showEdicion = true;

  }

  onDeactivate() {
    //console.log("Deactivate outlet edicion, osea se oculta el kardex");
    this.showEdicion = true;
    // this.showEdicion = false;

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

    console.log(this.almacenIngresoDetallesModel);
    // console.log(<AlmacenIngresoDetalleModel[]>this.ListProductosIngresar);
  }

  _getObjectProducto(event) {
    this.productoSeleccionado = event;
    this.openDialog();
    console.log(this.productoSeleccionado);
  }

  _getObJectProductoListIngresar(producto: ProductoModel) {
    this.productoSeleccionado = producto;
    this.openDialog();
    console.log(this.productoSeleccionado);
  }

  
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
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
