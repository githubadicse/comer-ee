import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';



import { PeriodoalmacenModel } from '../../periodoalmacen/periodoalmacen-model';
import { PeriodoalmacenService } from '../../periodoalmacen/periodoalmacen.service';



import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';

import { AlmacenIngresoService } from '../../almacen-ingreso/almacen-ingreso.service';
import { AlmacenSalidaService } from '../../almacen-salida/almacen-salida.service';
import { CodigobarraService } from '../../../modulo-sistema-config/tablas/codigobarra/codigobarra.service';
import { AlmacenService } from '../../../modulo-sistema-config/tablas/almacen/almacen.service';
import { ProductoModel } from '../../../modulo-sistema-config/tablas/producto/model/producto.model';
import { CodigobarraModel } from '../../../modulo-sistema-config/tablas/codigobarra/codigobarra-model';
import { AlmacenModel } from '../../../modulo-sistema-config/tablas/almacen/almacen-model';



@Component({
  selector: 'ad-kardex-opts',
  templateUrl: './kardex-opts.component.html',
  styleUrls: ['./kardex-opts.component.css'],
  providers: [ AlmacenService, PeriodoalmacenService, AlmacenIngresoService, CodigobarraService, AlmacenSalidaService, CrudHttpClientServiceShared]
})
export class KardexOptsComponent implements OnInit {
  public idalmacen: number = 1;
  public _idalmacen: number = 1;
  public idperiodoalmacen: any = null;
  public idproducto: any = null;
  sub: any;
  public msgs = [];

  public productosModel: ProductoModel[] = [];
  public productoModel: ProductoModel;
  public codigobarraModel: CodigobarraModel;

  public almacensModel: AlmacenModel[] = [];
  public almacenModel: AlmacenModel;

  public periodoalmacenModel: PeriodoalmacenModel;
  public periodoalmacensModel: PeriodoalmacenModel;

  constructor(
    private crudHttpClientServiceShared:CrudHttpClientServiceShared,
    private route: ActivatedRoute,
    private router: Router,
    private periodoalmacenService: PeriodoalmacenService,
    private almacenIngresoService: AlmacenIngresoService,
    private codigobarraService: CodigobarraService,
    private almacenSalidaService: AlmacenSalidaService,
    private almacenService:AlmacenService

  ) { }

  ngOnInit() {
    this.idalmacen = 1;
    this.sub = this.route.params.subscribe(
      params => {
        debugger;
        this.idalmacen = +params['idalmacen'];
        this.idproducto = +params['idproducto'];
        this.idperiodoalmacen = +params['idperiodoalmacen'];

        //this.idalmacen = isNaN(this.idalmacen)?0:this.idalmacen;
        if(!isNaN(this.idalmacen)){
          this.getAlmacen();
          this.getPeriodosalmacen();
          this.getPeriodoalmacen();          
        }else{
          this.getAllAlmacen();
          this.getPeriodosalmacen();
        }
       
  


      }
    );






    this.getProducto();
  }

  getAllAlmacen() {

    this.almacenService.getAll()
      .subscribe(
      result => {
        this.almacensModel = result;

      }
      )

  }

  getPeriodosalmacen() {
    this.msgs = [];
    let tipoaviso = 'warn';
    debugger;
    if (this.idalmacen == undefined || isNaN(this.idalmacen)) {
      this.msgs.push({ severity: tipoaviso, summary: 'Aviso', detail: 'Debe indicar el almacen' });
      return;
    }
    this.periodoalmacenService.findAllByAlmacen(this.idalmacen)
      .subscribe(
      result => {

       // this.periodoalmacensModel = result.data;
        //this.getAllAlmacen();


      }
      )

  }


  onChangeAlmacen(e) {
    let x = this.almacenModel;
    this.idalmacen = x.idalmacen;
    this.getPeriodosalmacen();



  }

  getAlmacen() {
    debugger;
    this.crudHttpClientServiceShared.edit(this.idalmacen, "almacen", "findbyid")
      .subscribe(
      res => {
        this.almacenModel = new AlmacenModel(res.idalmacen,res.dscalmacen,res.direccion) ;
      
        this.getAllAlmacen();
      }
      )

  }


  getProducto() {
    debugger;
    if( isNaN(this.idproducto) ){
      return;
    }
    this.crudHttpClientServiceShared.edit(this.idproducto, "producto", "findbyid")
      .subscribe(
      res => {
        this.productoModel = res;
      }

      )
  }

  getPeriodoalmacen() {
    this.crudHttpClientServiceShared.edit(this.idperiodoalmacen, "periodoalmacen", "findbyid")
      .subscribe(
      res => {
        this.periodoalmacenModel = res;
      }
      )
  }

  searchProducto(event) {

    let query = event.query;

    if (query == undefined) {
      query = "";
    }

    this.almacenIngresoService.getProductosFilter(query)
      .subscribe(
      res => {
        this.productosModel = res;
      }
      )
  }

  searchCodigoBarra(event) {

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
      res => {
      /*   if (res.data.length > 0) {
          this.codigobarraModel = res.data[0];
          this.productoModel = this.codigobarraModel.producto;

        } */

      }
      )

  }



  getpdfkardex(e) {
    //this.sharedService.getPdfKardexProducto("kardex", "pdfkardexproducto", this.periodoalmacenModel.mes, this.periodoalmacenModel.anno, this.idalmacen, this.productoModel.idproducto);
  }

  getListaIngresos(e) {
    this.almacenIngresoService.getPdListaNotaIngresoPorProducto(this.productoModel.idproducto, this.periodoalmacenModel.idperiodoalmacen);

  }

  getListaSalidas(e) {
    this.almacenSalidaService.getPdListaNotaSalidaPorProducto(this.productoModel.idproducto, this.periodoalmacenModel.idperiodoalmacen);
  }

}
