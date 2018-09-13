import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment} from '@angular/router';
import { Location} from '@angular/common';

import { AlmacenSalidaService } from '../almacen-salida.service';



import { AlmacenSalidaModel } from '../almacen-salida-model';
import { AlmacenSalidaDetalleModel } from '../almacen-salida-detalle-model';

import { SharedService } from '../../../shared/servicio/shared.service';

import { ConfigService } from '../../../shared/config.service';
import { PeriodoalmacenService } from '../../periodoalmacen/periodoalmacen.service';

import { EmpleadoModel } from '../../../modulo-cuenta-rr-hh/empleado/empleado-model';

import { TipodocumentoModel } from '../../../modulo-sistema-config/tipodocumento/tipodocumento-model';
import { PeriodoalmacenModel } from '../../periodoalmacen/periodoalmacen-model';
import { CodigobarraService } from '../../../modulo-sistema-config/tablas/codigobarra/codigobarra.service';
import { ProveedorclienteService } from '../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente.service';
import { ProductoModel } from '../../../modulo-sistema-config/tablas/producto/model/producto.model';
import { CodigobarraModel } from '../../../modulo-sistema-config/tablas/codigobarra/codigobarra-model';
import { AlmacenModel } from '../../../modulo-sistema-config/tablas/almacen/almacen-model';
import { MotivoSalidaModel } from '../../../modulo-sistema-config/tablas/motivo-salida/motivo-salida-model';
import { ProveedorclienteModel } from '../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model';


@Component({
  selector: 'ad-almacen-salida-edicion',
  templateUrl: './almacen-salida-edicion.component.html',
  styleUrls: ['./almacen-salida-edicion.component.css'],
  providers: [SharedService, AlmacenSalidaService, CodigobarraService, ProveedorclienteService,
    ConfigService,
    PeriodoalmacenService]
})
export class AlmacenSalidaEdicionComponent implements OnInit {
  showEdicion: boolean = true;

  msgPopup: any[];
  id: number;
  sub: any;
  public salidaForm: any;
  public productosModel: ProductoModel[] = [];
  public productoModel: ProductoModel;
  public codigobarraModel: CodigobarraModel;

  public almacenSalidaModel: AlmacenSalidaModel;

  public almacenSalidaDetallesModel: AlmacenSalidaDetalleModel[] = [];
  public almacenSalidaDetalleModel: AlmacenSalidaDetalleModel;

  public almacensModel: AlmacenModel[] = [];
  public almacenModel: AlmacenModel;

  public empleadosModel: EmpleadoModel[] = [];
  public empleadoModel: EmpleadoModel;

  public motivoSalidasModel: MotivoSalidaModel[] = [];
  public motivoSalidaModel: MotivoSalidaModel;

  public proveedorclientesModel: ProveedorclienteModel[] = [];
  public proveedorclienteModel: ProveedorclienteModel;

  public tipodocumentosModel: TipodocumentoModel[] = [];
  public tipodocumentoModel: TipodocumentoModel;

  public periodoalmacenModel: PeriodoalmacenModel;

  cantidad: number = 0;
  nrolote: string = "";
  fechaVencimiento: Date = null;

  public visibleDetalle:boolean = false;


  public msgs = [];

  es: any;
  private myUrl:any;

  @ViewChild('codigobarra') codigobarraControl: ElementRef;
  @ViewChild('cantidad_') cantidadControl: ElementRef;
  @ViewChild('divedicion') divedicion: ElementRef;
  @ViewChild('divkardex') divkardex: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private almacenSalidaService: AlmacenSalidaService,
    private codigobarraService: CodigobarraService,
    private proveedorclienteService: ProveedorclienteService,
    private periodoalmacenService: PeriodoalmacenService,
    private configService: ConfigService,
    private changeDetectorRef: ChangeDetectorRef,
    private _location : Location,

  ) { 
 


  }

  getRoutes() { const segments: UrlSegment[] = this.route.snapshot.url; }
  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.getRoutes();
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

    this.buildForm();
   
    if (this.id == 0) {
      this.newSalida();

    } else {
      this.almacenSalidaModel = new AlmacenSalidaModel();

    }
    ;



    this.doAsyncTask().then(
      //(val) => console.log(val),
      //(err) => console.error(err)
    )

    setTimeout(() => {
      this.codigobarraControl.nativeElement.focus();

    }, 500);

  }


  doAsyncTask() {
    let error = false;
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Inicio carga...");
        this.getAllAlmacen()
        this.getAllEmpleado();
        this.getAllMotivoSalida();
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
      motivosalida: ['', Validators.required]
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


  newSalida() {
    this.almacenSalidaModel = new AlmacenSalidaModel();
    this.almacenSalidaDetallesModel = [];

  }



  searchProducto(event) {

    let query = event.query;

    if (query == undefined) {
      query = "";
    }

    this.almacenSalidaService.getProductosFilter(query)
      .subscribe(
      res => {
        //this.productosModel = res.data;
      }
      )
  }


  searchCodigoBarra(event) {
    let cantidadControl = this.cantidadControl;
    if (event.key != "Enter") {
      return;
    }

    let query = event.target.value;

    if (query == undefined) {
      query = "";
    }

    if (query == "")
      return;


    this.codigobarraService.getAllByCodigoEquals(query)
      .subscribe(
   /*    res => {
        if (res.data.length > 0) {
          this.codigobarraModel = res.data[0];
          this.productoModel = this.codigobarraModel.producto;

          setTimeout(() => {
            cantidadControl.nativeElement.focus();
            cantidadControl.nativeElement.select();
          }, 500);


        }

      } */
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
      // if (this.productoModel.exigelote && this.nrolote == "") {
      //   this.msgs.push({ severity: tipoaviso, summary: 'Aviso', detail: 'El producto exige que especifique el nro de lote' });
      //   rtn = true;
      // }
      // if (this.productoModel.exigevencimiento && this.fechaVencimiento == null) {
      //   this.msgs.push({ severity: tipoaviso, summary: 'Aviso', detail: 'El producto exige que especifique la fecha de vencimiento' });
      //   rtn = true;
      // }
    }
    if (this.cantidad == 0) {
      this.msgs.push({ severity: tipoaviso, summary: 'Aviso', detail: 'La cantidad debe ser mayor a cero (0)' });
      rtn = true;
    }
    if (rtn) {
      return;
    }


    this.almacenSalidaDetalleModel = new AlmacenSalidaDetalleModel();


    this.almacenSalidaDetalleModel.producto = this.productoModel;
    this.almacenSalidaDetalleModel.cantidad = this.cantidad;
    this.almacenSalidaDetalleModel.nrolote = this.nrolote;
    this.almacenSalidaDetalleModel.fechavencimiento = this.fechaVencimiento;

    this.almacenSalidaModel.salida002s.push(this.almacenSalidaDetalleModel);

    this.almacenSalidaModel.salida002s = this.almacenSalidaModel.salida002s.slice();




    this.codigobarraControl.nativeElement.value = "";
    this.productoModel = null;
    this.cantidad = 0;
    this.nrolote = "";
    this.fechaVencimiento = null;
    this.almacenSalidaDetalleModel = null;

    setTimeout(() => {
      this.codigobarraControl.nativeElement.focus();
    }, 500);

  }

  getAllAlmacen() {

    this.sharedService.getAll("almacen", "getall")
      .subscribe(
      result => {
       // this.almacensModel = result.data;
      }
      )

  }

  getAllEmpleado() {

    this.sharedService.getAll("empleado", "getall")
      .subscribe(
      result => {
       // this.empleadosModel = result.data;
      }
      )

  }


  getAllMotivoSalida() {

    this.sharedService.getAll("motivosalida", "getall")
      .subscribe(
      result => {
       // this.motivoSalidasModel = result.data;
      }
      )

  }


  getAllTipoDocumento() {
    this.sharedService.getAll("tipodocumento", "getall")
      .subscribe(

      result => {
       // this.tipodocumentosModel = result.data;
      }
      )
  }

  searchProveedorCliente(event) {

    let query = event.query;

    if (query == undefined) {
      query = "";
    }

   /*   this.proveedorclienteService.getProveedorclienteFilter(query)
      .subscribe(
      res => {
        debugger;
        this.proveedorclientesModel = res.data;
      }
      )  */

  }

  getPeriodoAlmacenByEstado() {

    let date = new Date(this.almacenSalidaModel.fecha.toString());

    let anno = date.getFullYear()
    let mes = date.getMonth() + 1;
    let idalmacen = this.almacenSalidaModel.almacen.idalmacen;

    this.periodoalmacenService.getPeriodoAlmacenByEstado(anno, mes, 'A', idalmacen)
      .subscribe(
      res => {
        
        let success = false;
 /*        if (res.success) {
          success = true;
          this.periodoalmacenModel = res.data;
          this.save();
        } else {
          success = false;
          this.msgPopup = [];
          this.msgPopup.push({ severity: 'error', summary: 'Aviso Periodo Invalido', detail: 'El registro no se grabo !' });
        } */
      },
      error => { },
      () => { }
      )
  }


  beforeSave() {
    let build = this.salidaForm;



    this.almacenSalidaModel.almacen = build.controls['almacen'].value;//
    this.almacenSalidaModel.empleado = build.controls['empleado'].value;
    this.almacenSalidaModel.fecha = build.controls['fecha'].value;
    this.almacenSalidaModel.hora = build.controls['hora'].value;
    this.almacenSalidaModel.motivosalida = build.controls['motivosalida'].value;

    this.almacenSalidaModel.periodoalmacen = build.controls['periodoalmacen'].value;
    this.almacenSalidaModel.proveedorcliente = build.controls['proveedorcliente'].value;
    /*   this.almacenSalidaModel.nrodocproveedor = build.controls['nrodocproveedor'].value;
      this.almacenSalidaModel.seriedocproveedor = build.controls['seriedocproveedor'].value;
      this.almacenSalidaModel.tipodocumento = build.controls['tipodocumento'].value; */


    this.getPeriodoAlmacenByEstado();


  }

  edit() {
   
    this.sharedService.findById(this.id, "salida001", "findById")
      .subscribe(
      result => {
        
        //this.almacenSalidaModel = result.data;


        let date = this.configService.stringToDate(this.almacenSalidaModel.fecha, "dd/MM/yyyy", "/");
        //this.almacenIngresoModel.fecha = date.toString();

        let hora = this.configService.stringToTime(this.almacenSalidaModel.hora, "hh:mm", ":");

        //this.almacenIngresoDetallesModel = this.almacenIngresoModel.ing002s;
        this.almacenSalidaModel.salida002s = this.almacenSalidaModel.salida002s.slice();
        //this.salidaForm.setValue(this.almacenIngresoModel);

        this.salidaForm.controls["idsalida001"].setValue(this.almacenSalidaModel.idsalida001);
        this.salidaForm.controls["fecha"].setValue(date);
        this.salidaForm.controls["hora"].setValue(hora);
        this.salidaForm.controls["proveedorcliente"].setValue(this.almacenSalidaModel.proveedorcliente);
        this.salidaForm.controls["nrodoc"].setValue(this.almacenSalidaModel.nrodoc);
        this.salidaForm.controls["almacen"].setValue(this.almacenSalidaModel.almacen);
        this.salidaForm.controls["periodoalmacen"].setValue(this.almacenSalidaModel.periodoalmacen);
        this.salidaForm.controls["empleado"].setValue(this.almacenSalidaModel.empleado);
        this.salidaForm.controls["glosa"].setValue(this.almacenSalidaModel.glosa);
        this.salidaForm.controls["motivosalida"].setValue(this.almacenSalidaModel.motivosalida);
        // this.salidaForm.controls["tipodocumento"].setValue(this.almacenSalidaModel.tipodocumento);
        // this.salidaForm.controls["seriedocproveedor"].setValue(this.almacenSalidaModel.seriedocproveedor);
        // this.salidaForm.controls["nrodocproveedor"].setValue(this.almacenSalidaModel.nrodocproveedor);


      }
      )
  }

  save() {

    let fecha = this.configService.getDateString(this.almacenSalidaModel.fecha);
    let hora = this.configService.getHoraString(this.almacenSalidaModel.hora);


    this.almacenSalidaModel.fecha = fecha;
    this.almacenSalidaModel.hora = hora;
    this.almacenSalidaModel.periodoalmacen = this.periodoalmacenModel;
    this.almacenSalidaModel.fechahorasys = null;

    //this.almacenIngresoModel.ing002s = this.almacenIngresoDetallesModel;

    this.sharedService.save(this.almacenSalidaModel, "salida001", "save")
      .subscribe(
      res => {
        this.msgPopup = [];
        this.msgPopup.push({ severity: 'success', summary: 'Aviso', detail: 'Registro Grabado !' });

      },
      error => {
        alert(error);
      },
      () => {
        this.almacenSalidaDetallesModel = [];
        this.almacenSalidaModel = new AlmacenSalidaModel();
        this.buildForm();
      }





      )
  }

  getKardex(e){

    let idalmacen = this.almacenSalidaModel.almacen.idalmacen
    let idproducto = e.producto.idproducto;
    let idperiodoalmacen = this.almacenSalidaModel.periodoalmacen.idperiodoalmacen;

    let dato = {idalmacen: idalmacen, idproducto: idproducto, idperiodoalmacen:idperiodoalmacen};
    
    this.router.navigate(['./kardex',  dato], { relativeTo: this.route } );
    
    //this.router.navigate(['../'], { relativeTo: this.route });

  }




  onActivate() {
    console.log("Activate outlet edicion, osea se muestra el kardex");
    this.showEdicion = false;
    // this.showEdicion = true;

  }  

  onDeactivate() {
    console.log("Deactivate outlet edicion, osea se oculta el kardex");
     this.showEdicion = true;
    // this.showEdicion = false;

  }
  

}
