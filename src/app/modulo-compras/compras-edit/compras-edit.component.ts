import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConfigService } from '../../shared/config.service';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';
import { LocalStorageManagerService } from '../../shared/servicio/local-storage-manager.service';

import { AlmacenIngresoModel } from '../../modulo-almacen/almacen-ingreso/almacen-ingreso-model';
import { AlmacenIngresoDetalleModel } from '../../modulo-almacen/almacen-ingreso/almacen-ingreso-detalle-model';
import { ProductoModel } from '../../modulo-sistema-config/tablas/producto/model/producto.model';
import { CompraDetalleModel } from '../compra-detalle-model';

import swal from 'sweetalert2';
import { MSJ_LOADING, MSJ_SUCCESS_TOP_END } from '../../shared/config.service.const';
import { ComprasEditDialogComponent } from './compras-edit-dialog/compras-edit-dialog.component';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompraModel } from '../compra-model';
import { MomentDateAdapter } from '../../shared/validators/MomentDateAdapter';
// import { MatPaginator, MatTableDataSource, MatTable, MatTableModule } from '@angular/material'
import { CompraDetalleRelacionModel } from '../compra-detalle-relacion.model';

@Component({
  selector: 'app-compras-edit',
  templateUrl: './compras-edit.component.html',
  styleUrls: ['./compras-edit.component.scss'],
  providers: [ConfigService, MomentDateAdapter]
})
export class ComprasEditComponent implements OnInit {
  public showChild: boolean = false;
  public showBusquedaNotaCredito: boolean = false;

  isUpdate: boolean = false; // si se actualiza, crea o modifica registro, notifica actulizacion con el evento "back"
  
  // id a modificar
  @Input('idRegistro') idRegistro: number;

  // se emite al dar click en el boton "atras". Emite el valor de isUpdate = si se actulizo o no para refrescar lista pricipal
  @Output('back') back:EventEmitter<boolean> = new EventEmitter(true); 
  
  public idFilial:number=1;

  public compraForm: FormGroup;
  public checkFlagFromNotaIngreso: boolean = false;  
  public procesando: boolean = false;

  public idFilialNotaCredito: number;

  public compraModel : CompraModel;
  private compraDetalleRelacion: CompraDetalleRelacionModel;
  private notaIngreso: AlmacenIngresoModel = null;
  private listProductosNotaIngreso: AlmacenIngresoDetalleModel[] = [];  
  public dscNotaIngeso: string = '';
  listProductosCompra:CompraDetalleModel[] = [];
  listModel:CompraDetalleModel[] = [];
  listaMostrar: CompraDetalleModel[] = [];

  public displayedColumns: string[] = ['#', 'Producto', 'Cantidad', 'ISC', 'Bruto', 'Desc', 'Val.Compra', 'IGV %', 'IGV', 'Imp.Compra', 'Flete', 'Imp.Uni', 'Costo.Uni','-'];
  private productoSeleccionado: ProductoModel;

  public TotalImporteISC: number = 0; 
  public TotalImporteBruto: number = 0;
  public TotalImporteIGV: number = 0;
  public TotalImporteFlete: number = 0;
  public TotalImporteCompra: number = 0;


  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService,
    private crudHttpClientServiceShared:CrudHttpClientServiceShared,
    private localStorageManagerService: LocalStorageManagerService,
    private dialog: MatDialog,
    private DateAdapter: MomentDateAdapter,
    private cd: ChangeDetectorRef
  ) { }

  public ngDoCheck(): void { this.cd.detectChanges(); }

  ngOnInit() {      
  }

  ngOnChanges() {
    if (!this.idRegistro) {
      this.newCompra();
    } else {
      // this.almacenIngresoModel = new AlmacenIngresoModel();
      this.buildForm();
      this.edit();
    };
  }

  
  buildForm() {

    this.compraForm = this.formBuilder.group({
      idcom001: ['0'],
      
      tipodocumento: [''],
      documentoSerie : [''],
      documentoNumero : [''],
      proveedorcliente: ['', Validators.required],
      fechaEmision: [''],
      fechaVencimiento:[''],
      almacen: ['', Validators.required],
      modalidadCompraVenta:[''],
      flagGeneraFromNotaIngreso:[this.checkFlagFromNotaIngreso],
      moneda:[''],

      importeIsc: [''],
      importeBruto:[''],
      importeIgvPorcentaje:[''],
      importeIgv:[''],
      importeCompra:[''],
      tipoCambio:0,
      importePagos:[''],

      fechaRegistroSystema:[''],
      idUsuarioCrea:[''],

      fechaRegistroSystemaModifica:[''],
      idUsuarioModifica:[''],

      com002s:['']

    });

  }  

  newCompra() {
    this.compraModel = new CompraModel();
    this.listProductosCompra = [];    
    this.notaIngreso = null;
      
    this.localStorageManagerService.removeAllLocalSotrage('carrito')
    this.buildForm();
  }

  create(){
    // if (this.procesando) {return;}
    // this.procesando = true;

    if (this.idRegistro) { this.update(); return;}

    // elimina el key "nomes" de periodoalmacen que no es parte del modelo orginal y se usa para mostrar el nombre del mes en el control  
    // delete this.compraForm.value.periodoalmacen["nommes"];
    
    let fechaMomentEmision = this.compraForm.controls['fechaEmision'].value;
    let fechaMomentVencimineto= this.compraForm.controls['fechaVencimiento'].value;

    let fechaEmision = this.DateAdapter.format(this.compraForm.controls['fechaEmision'].value, 'DD/MM/YYYY');
    let fechaVencimiento = this.DateAdapter.format(this.compraForm.controls['fechaVencimiento'].value, 'DD/MM/YYYY');
   
    this.compraForm.controls['fechaEmision'].setValue(fechaEmision);
    this.compraForm.controls['fechaVencimiento'].setValue(fechaVencimiento);
    
    this.compraForm.controls['importeIsc'].setValue(this.TotalImporteISC);
    this.compraForm.controls['importeBruto'].setValue(this.TotalImporteBruto);
    this.compraForm.controls['importeIgv'].setValue(this.TotalImporteIGV);
    this.compraForm.controls['importeCompra'].setValue(this.TotalImporteCompra);
    
    // evalua si productos proceden de nota de ingreso    
    this.listModel.map(x => {
      let ingComRelation: CompraDetalleRelacionModel[] = [];
      if (this.notaIngreso) {
        const hora = this.notaIngreso.hora.split(':'); // modifica hora de [hh:mm:ss] a [hh:mm]        
        let compraDetalleRelacion: CompraDetalleRelacionModel = new CompraDetalleRelacionModel();        
        this.notaIngreso.hora = hora[0]+':'+hora[1];

        compraDetalleRelacion.ing001 = this.notaIngreso;
        // compraDetalleRelacion.com002 = x        
        ingComRelation.push(compraDetalleRelacion);
        x.ing001Com002Relacions = ingComRelation;
      } else {
        x.ing001Com002Relacions = null;
      }
    });


    

    this.compraForm.controls['com002s'].patchValue(this.listModel);


    console.log(this.compraForm.value);
    let data = JSON.stringify(this.compraForm.value);
    //let data = this.compraForm.value;
    console.log(data);
    
    this.compraForm.controls['fechaEmision'].setValue(fechaMomentEmision);
    this.compraForm.controls['fechaVencimiento'].setValue(fechaMomentVencimineto);


    // return;
    this.crudHttpClientServiceShared.create(data, "com001", "create").subscribe(
       res => {},
       error => { console.log(error); this.procesando = false;},
       () => {
         this.newCompra();
         swal(MSJ_SUCCESS_TOP_END);        
         this.procesando = false;
         this.isUpdate=true;
                 
       }
    )
  }

  update() {
        
    this.compraForm.controls['com002s'].setValue(this.listProductosCompra);

    this.compraModel = <CompraModel> this.compraForm.value        
    this.compraModel.fechaEmision = this.configService.getDateToStringAllType(this.compraModel.fechaEmision);
    this.compraModel.fechaVencimiento = this.configService.getDateToStringAllType(this.compraModel.fechaVencimiento);    

    const data = JSON.stringify(this.compraModel);    
    console.log(this.compraModel);

    this.crudHttpClientServiceShared.update(data, "com001", "update").subscribe(
       res => {
            swal(MSJ_SUCCESS_TOP_END); 
            this.procesando=false; 
            this.isUpdate=true;
          },
       error => { console.log(error); this.procesando=false; }
      )
  }

  edit() {

    this.crudHttpClientServiceShared.edit(this.idRegistro,'com001','findById').subscribe(
      res => {                        
        
        const data = <CompraModel>res.data;
        Object.keys(data).forEach(name => {
          if (this.compraForm.controls[name]) {
            this.compraForm.controls[name].patchValue(data[name]);
          }
        });
        
        const fechaEmision = this.configService.stringToDate(data.fechaEmision,'DD/MM/YYYY','/');
        const fechaVencimiento = this.configService.stringToDate(data.fechaVencimiento,'DD/MM/YYYY','/');
        this.compraForm.controls['fechaEmision'].patchValue(fechaEmision);
        this.compraForm.controls['fechaVencimiento'].patchValue(fechaVencimiento);        

        const listProductos:any = data.com002s;
        listProductos.map(x => {
          this.crudInsertModel(x,'idproducto',x.producto.idproducto);
        })        
        //ing002's
        // this.insertLocalStorageFromEdit(data.ing002s);

      })      

  }

  // updateNotaIngreso(Com001: CompraModel): void {    
  //   if ( this.notaIngreso=== null ) {return;}
  //   this.notaIngreso.com001 = Com001;
  //   this.crudHttpClientServiceShared.create(this.notaIngreso.com001, "ing001", "updateCom001").subscribe(
  //     res => {},
  //     error => { console.log(error);},
  //     () => {
  //     }
  //  )
  // }

  _getObJectProductoListIngresar(row: any): void {
    this.productoSeleccionado = <ProductoModel>row.producto;
    this.openDialog(row);
    console.log(this.productoSeleccionado);
  }

  getTotalISC() {
    return this.TotalImporteISC = this.listProductosCompra.map(t => t.importeIsc).reduce((acc, value) => acc + value, 0);
  }
  getTotalBruto() {
    return this.TotalImporteBruto = this.listProductosCompra.map(t => t.importeBruto).reduce((acc, value) => acc + value, 0);
  }
  getTotalDsc() {
    return this.listProductosCompra.map(t => t.importeDescuento).reduce((acc, value) => acc + value, 0);
  }
  getTotalValCompra() {
    return this.listProductosCompra.map(t => t.importeValorCompra).reduce((acc, value) => acc + value, 0);
  }
  getTotalImporteIGV() {
    return this.TotalImporteIGV = this.listProductosCompra.map(t => t.importeIgv).reduce((acc, value) => acc + value, 0);
  }
  getTotalImporteCompra() {
    return this.listProductosCompra.map(t => t.importeCompra).reduce((acc, value) => acc + value, 0);
  }
  getTotalImporteFlete() {
    return this.TotalImporteFlete = this.listProductosCompra.map(t => t.importeFlete).reduce((acc, value) => acc + value, 0);
  }
  getTotalImporteUnitario() {
    return this.listProductosCompra.map(t => t.importeUnitario).reduce((acc, value) => acc + value, 0);
  }
  getTotalCostoUnitario() {
    return this.TotalImporteCompra = this.listProductosCompra.map(t => t.importeTotalCostoUnitario).reduce((acc, value) => acc + value, 0) || 0;
  }


  regresar(): void {
    this.back.emit(this.isUpdate);
  }

  regresarFromNotaingreso(): void {
    this.showBusquedaNotaCredito = !this.showBusquedaNotaCredito;
  }

  _getRptBusquedaNotaIngreso(iding001: number): void {
    

    swal(MSJ_LOADING);
    this.crudHttpClientServiceShared.edit(iding001,'ing001','findById').subscribe(
      res=>{
        this.notaIngreso = res.data;
        this.listProductosNotaIngreso = this.notaIngreso.ing002s;
        this.dscNotaIngeso = `DESDE NOTA DE INGRESO N° `+ this.notaIngreso.nrodoc;

        // setea el formulario
        const data = this.notaIngreso;
        Object.keys(data).forEach(name => {
          if (this.compraForm.controls[name]) {
            this.compraForm.controls[name].patchValue(data[name]);
          }
        });
        this.compraForm.controls['documentoSerie'].patchValue(data.seriedocproveedor);
        this.compraForm.controls['documentoNumero'].patchValue(data.nrodocproveedor);

        // seteamos productos de nota de ingreso
        this.listProductosNotaIngreso.map(x => {
          let rowInsert: CompraDetalleModel = new CompraDetalleModel();
          rowInsert.producto = x.producto;
          rowInsert.cantidad = x.cantidad;

          this.crudInsertModel(rowInsert,'idproducto',rowInsert.producto.idproducto);        
        });

        
        console.log(this.notaIngreso);
        swal.close();
        this.regresarFromNotaingreso();
      })
        
  }

  _getObjectProducto(event): void {
    this.productoSeleccionado = event;
    this.openDialog();    
    console.log(this.productoSeleccionado);
  }

  openDialog(row: any = null) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';

    // pasa ProductoModel selecionado

    dialogConfig.data = {
      producto: this.productoSeleccionado,
      cantidad: row ? row.cantidad : '',
      importeBruto : row ? row.importeBruto : '',
      importeIsc : row ? row.importeIsc : '',
      importeDescuento : row ? row.importeDescuento : '',
      importeValorCompra : row ? row.importeValorCompra : '',
      importeIgv : row ? row.importeIgv : '',
      importePorcentajeIgv : row ? row.importePorcentajeIgv : '',
      importeFlete : row ? row.importeFlete : '',
      importeUnitario : row ? row.importeUnitario : '',
      importeTotalCostoUnitario : row ? row.importeTotalCostoUnitario : '',
      importeCompra : row ? row.importeCompra : ''      
    }
    
    const dialogRef = this.dialog.open(ComprasEditDialogComponent,dialogConfig);

    // subscribe al cierre y obtiene los datos
    dialogRef.afterClosed().subscribe(
        ( item: CompraDetalleModel ) => {
          if (!item) return;
          this.crudInsertModel(item,'idproducto',item.producto.idproducto);        
        }
    ); 
  }

  /////////////////////// crud modelos
  // crudNewModel(): any {
  //   return this.listModel = [];
  // }

  crudInsertModel(item: any, campoComparar: string, valorCompare: any): void {              
    let index: number = this.crudFindIndexItem(campoComparar, valorCompare);
    index = index === null ? this.listModel.length : index;
    this.listModel[index] = item;
        
    this.listProductosCompra = JSON.parse(JSON.stringify(this.listModel));

    console.log('lista listProductosCompra: ', this.listProductosCompra);
    // console.log('lista listModel: ', this.listModel);
    this.localStorageManagerService.setAllDataLocalStorage('carrito',this.listProductosCompra);
    
  }

  // crudGetData(): any {
  //   return this.listModel;
  // } 

  crudFindIndexItem(campoComparar: string, valorCompare: any ): number {
    let _index: number = null;
    this.listProductosCompra.map((x, index) => {
      const valor = this.crudFindCompare(x, campoComparar);
      if (valor.toString() === valorCompare.toString()) {
        _index = index;
        return;
      }
    })
    return _index;
  }

  crudFindCompare(item: any, campoComparar: string): any {
    let cadenaBuscar = JSON.stringify(item);
    let posicion = cadenaBuscar.indexOf(campoComparar);
    cadenaBuscar = cadenaBuscar.substring(posicion);
    posicion = cadenaBuscar.indexOf(',')
    const valor = cadenaBuscar.substring(0, posicion).split(':')[1];
    return valor;
  }



}
