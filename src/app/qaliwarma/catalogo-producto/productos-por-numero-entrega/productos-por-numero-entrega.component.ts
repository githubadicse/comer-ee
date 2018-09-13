import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoPorNumeroEntregaModel } from '../../producto-por-numero-entrega/producto-por-numero-entrega-model';
import { ProductoPorNumeroEntregaService } from '../../producto-por-numero-entrega/producto-por-numero-entrega.service';
import { error, isString, debug } from 'util';
import swal from 'sweetalert2';
import { CatalogoMarcaService } from '../../catalogo-marca/catalogo-marca.service';
import { CatalogoMarcaModel } from '../../catalogo-marca/catalogo-marca-model';

import { CatalogoLoteModel } from '../../catalogo-lote/catalogo-lote-model';
import { CatalogoLoteService } from '../../catalogo-lote/catalogo-lote.service';
import { UtilitariosAdicse } from '../../../shared/servicio/utilitariosAdicse';
import { ConfigService } from '../../../shared/config.service';
import { PikingModel } from '../../piking/piking-model';
import { PikingService } from '../../piking/piking.service';
import { RequerimientoVolumen001Model } from '../../requerimiento-volumen-001/requerimiento-volumen-001-model';
import { VolumenConvertidoEnvaceModel } from '../../volumen-convertido-envase/volumen-convertido-envase-model';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { MarcaArticuloService } from '../../../modulo-sistema-config/tablas/marca-articulo/marca-articulo.service';
import { MarcaArticuloModel } from '../../../modulo-sistema-config/tablas/marca-articulo/marca-articulo-model';



@Component({
  selector: 'app-productos-por-numero-entrega',
  templateUrl: './productos-por-numero-entrega.component.html',
  styleUrls: ['./productos-por-numero-entrega.component.css'],
  providers: [ProductoPorNumeroEntregaService, CatalogoMarcaService, MarcaArticuloService, CatalogoLoteService, UtilitariosAdicse, ConfigService, PikingService, CrudHttpClientServiceShared]
})
export class ProductosPorNumeroEntregaComponent implements OnInit {
  saving: boolean = false;
  loading: boolean;
  selectionLote: CatalogoLoteModel = new CatalogoLoteModel();
  selection: any;
  selectionMarca: any;
  es: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };
  periodo: number;
  id: any;
  sub: any;
  item: string = "999";
  numeroEntrega: number = 1;
  sumaCalculado: number = 0;
  sumaPiking: number = 0;

  public paginador: any;
  public CntCatalogoMarcasModel = 0;

  public productoPorNumeroEntregaModel: ProductoPorNumeroEntregaModel;
  public productoPorNumerosEntregaModel: ProductoPorNumeroEntregaModel[];

  public catalogoMarcaModel: CatalogoMarcaModel;
  public catalogoMarcasModel: CatalogoMarcaModel[];

  public marcaArticuloModel: MarcaArticuloModel;
  public marcaArticulosModel: MarcaArticuloModel[];

  public catalogoLoteModel: CatalogoLoteModel;
  public catalogoLotesModel: CatalogoLoteModel[] = [];

  public pikingModel: PikingModel;
  public pikingsModel: PikingModel[] = [];

  public requerimientoVolumen001Model: RequerimientoVolumen001Model[] = [];

  constructor(private route: ActivatedRoute,
    private productoPorNumeroEntregaService: ProductoPorNumeroEntregaService,
    private catalogoMarcaService: CatalogoMarcaService,
    private marcaArticuloService: MarcaArticuloService,
    private catalogoLoteService: CatalogoLoteService,
    private utilitariosAdicse: UtilitariosAdicse,
    private configService: ConfigService,
    private pikingService: PikingService,
    private crudHttpClientServiceShared:CrudHttpClientServiceShared
  ) {

    this.sub = this.route.params.subscribe(
      params => {

        this.id = params['id'];

      }
    );
  }

  ngOnInit() {
    this.numeroEntrega = parseInt(localStorage.getItem("numeroEntrega"));
    let f = new Date();
    this.periodo = f.getFullYear();

    this.getMarcaArticulos();


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

  }
  onRowClick(e: any) {

    if (this.selection) {
      if (this.selection == e.data) {
        return;
      }
    }


    this.selection = e.data;

    this.item = this.selection.entregaPorItem.itemEntrega.item;
    this.getCatalogoMarcaByIdProductoPorNumeroEntrega(e.data);

    let paramsExtraAux = { "anno": this.periodo, "numeroEntrega": this.numeroEntrega, "item": this.item };
    let paramsExtra = this.utilitariosAdicse.setMapToString(paramsExtraAux);

    this.paginador.dataPagination.paramsExtra = paramsExtra;
    this.paginador.refreshPage = !this.paginador.refreshPage;
    this.paginador.refreshModel(this.paginador.dataPagination);

  }

  onRowClickMarcasPorPresentacion(e: any) {


    
    if (this.selectionMarca) {
      if (this.selectionMarca == e.data) {
        return;
      }
    }
    this.selectionLote.pikings = [];
    this.selectionLote.pikings.slice();

    this.sumaCalculado = 0;
    this.sumaPiking = 0;


    this.selectionMarca = e.data;
    this.getCatalogoLoteByIdCatalogoMarca(e.data);
  }

  onRowClickLotePorPresentacion(e: any) {

    let saving = this.saving;
    if (saving) {
      return;
    }
    this.getPikingsByIdLote(e.data.idCatalogoLote);

    this.paginador.requerimientoVolumen001SeleccionadosModel = [];
    this.paginador.refreshModel(this.paginador.dataPagination);
    this.selectionLote = e.data;

    //this.getCatalogoLoteByIdCatalogoMarca(e.data);

  }

  getPikingsByIdLote(idCatalogoLote) {
    this.catalogoLoteService.getPikingByIdCatalogoLote(idCatalogoLote).subscribe(
      res => {

        if (res.length == 0) {
          this.selectionLote.pikings = [];
        }
        else {
          this.selectionLote.pikings = res.map(item => {
            return new PikingModel(item.idPiking, item.requerimientoVolumen001, item.cantidad, item.catalogoLote, item.volumenConvertidoEnvace);
          })
        }



        this.sumaCantidadPiking();
        this.sumaCantidadCalculada();
        this.saving = false;
        this.selectionLote.pikings = this.selectionLote.pikings.slice();
      }
    )
  }

  onEditComplete(e) {

    this.sumaCantidadPiking();
  }

  onSelectionCodigoModular(e) {
    //debugger;
    this.actualizaPikinModel(e);
  }
  onUnselectionCodigoModular(e) {
    //debugger;
    this.actualizaPikinModel(e);
  }
  eventHeaderCheckboxToggle(e) {
    this.actualizaPikinModel(e);
  }

  evenHandleAfterPagination(e) {
    this.paginador = e;

  }

  actualizaPikinModel(select) {
    
    if(select==null){
      this.loading = false;
      return ;
    }
    let idCatalogoLote = this.selectionLote.idCatalogoLote;
    let idProductoPorNumeroEntrega = this.selection.idProductoPorNumeroEntrega;
    this.loading = true;
    if (this.selectionLote.pikings.length == 0 && select.length == 1) {
      let piking = new PikingModel();
      piking.idPiking = "";
      piking.catalogoLote = this.selectionLote;
      piking.requerimientoVolumen001 = select[0];

      //this.selectionLote.pikings.push(piking);
      //piking.catalogoLote.pikings = null;
      this.selectionLote.pikings.push(piking);
      this.updatePikingList(idProductoPorNumeroEntrega, idCatalogoLote);
      this.loading = false;
      return;
    }

    select.forEach(element => {

      let existe: boolean = this.existeElementInPikingsModel(element);
      if (!existe) {

        let piking = new PikingModel("x", element, 0, this.selectionLote, null);
        //piking.idPiking = "";
        //piking.catalogoLote = this.selectionLote;
        //piking.requerimientoVolumen001 = element;
        //piking.catalogoLote.pikings = null;
        //debugger;
        this.selectionLote.pikings.push(piking);
        //this.pikingsModel.push(piking);
      }
    });
    //let pks:PikingModel[]=[];

    // this.pikingsModel.forEach(item => {
    //   let id = this.selectionLote.idCatalogoLote+"-"+ this.utilitariosAdicse.randomString();
    //   let piking = new PikingModel(id,item.requerimientoVolumen001,item.cantidad,this.selectionLote ,item.volumenConvertidoEnvace);
    //   piking.catalogoLote.pikings = null;
    //   pks.push(piking);

    // })
    // this.pikingsModel = pks;
    //this.pikingsModel = this.pikingsModel.slice();


    this.updatePikingList(idProductoPorNumeroEntrega, idCatalogoLote);



  }

  updatePikingList(idProductoPorNumeroEntrega, idCatalogoLote) {
    this.pikingsModel = [];
    this.selectionLote.pikings.forEach(item => {
      item.catalogoLote.pikings = null;
      this.pikingsModel.push(item);
    })
    this.pikingService.updatePikingList(this.pikingsModel, idProductoPorNumeroEntrega, idCatalogoLote).subscribe(
      res => {
        this.selectionLote.pikings = res.map(item => {
          return new PikingModel(item.idPiking, item.requerimientoVolumen001, item.cantidad, item.catalogoLote, item.volumenConvertidoEnvace)
        })
        
        this.selectionLote.pikings = this.selectionLote.pikings.slice();

      },
      error => {
        swal(error);
        this.loading = false;
      },
      () => {

        //this.selectionLote.pikings = this.pikingsModel;
        //this.selectionLote.pikings = this.selectionLote.pikings.slice();

        this.sumaCalculado = 0;
        this.sumaPiking = 0;

        this.selectionLote.pikings.forEach(element => {
        
          let VolumenConvertidoCantidad =  element.volumenConvertidoEnvace==null?0:element.volumenConvertidoEnvace.cantidad;
          this.sumaCalculado = this.sumaCalculado + VolumenConvertidoCantidad;
          this.sumaPiking = this.sumaPiking + element.cantidad;
          element.idPiking = this.selectionLote.idCatalogoLote + "-" + this.utilitariosAdicse.randomString();
        });

        this.loading = false;
      }


    )
  }

  sumaCantidadPiking() {
    this.sumaPiking = 0;
    if (this.selectionLote.pikings == null) {
      return;
    }
    if (this.selectionLote.pikings.length == 0) {
      return;
    }
    this.selectionLote.pikings.forEach(item => {
      this.sumaPiking = this.sumaPiking + parseInt(item.cantidad.toString());
    })

  }

  sumaCantidadCalculada() {
    this.sumaCalculado = 0;
    if (this.selectionLote.pikings == null) {
      return;
    }
    if (this.selectionLote.pikings.length == 0) {
      return;
    }
    this.selectionLote.pikings.forEach(item => {

      this.sumaCalculado = this.sumaCalculado + item.volumenConvertidoEnvace.cantidad;
    })

  }
  actualizaCantidadPiking() {
    this.sumaPiking = 0;

    this.selectionLote.pikings.forEach(item => {
      if (item.cantidad == 0)
        item.cantidad = item.volumenConvertidoEnvace.cantidad;

      this.sumaPiking = this.sumaPiking + item.cantidad;
    })


  }

  existeElementInPikingsModel(element: any): boolean {
    let existe = false;
    let codigoModular = element.codigomodularIinstitucionEducativa.codigoModular;

    this.pikingsModel.forEach(item => {
      
      let codigoModularItem = item.requerimientoVolumen001.codigomodularIinstitucionEducativa.codigoModular;

      if (codigoModular == codigoModularItem) {
        existe = true;

      }

    })


    return existe;
  }

  grabarProductoPorNumeroEntrega(e) {
    this.productoPorNumeroEntregaService.save(e).subscribe(
      res => {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Registro Actualizado',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

  grabarCatalogoMarca(e) {
    console.log(e);
    this.catalogoMarcaService.save(e).subscribe(
      res => {
        console.log(res);
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Registro Actualizado',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

  getMarcaArticulos() {

    console.log("marcas ..............")
    this.marcaArticuloService.getMarcaArticulos().subscribe(
      res => {
        this.marcaArticulosModel = res.map(
          item => {
            return new MarcaArticuloModel(
              item.idmarca,
              item.dscmarca
            )
          }
        )
      }, error => (console.log(error)),
      () => console.log(this.marcaArticulosModel)

    )

  }

  getCatalogoMarcaByIdProductoPorNumeroEntrega(e) {
    console.log(e)
    let id = e.idProductoPorNumeroEntrega;
    this.catalogoMarcaService.getCatalogoMarcaByIdProductoPorNumeroEntrega(id, this.periodo, this.numeroEntrega).subscribe(
      res => {
        this.catalogoMarcasModel = res.map(
          item => {
            return new CatalogoMarcaModel(
              item.idCatalogoMarca,
              item.dscCatalogoMarca,
              item.productoPorNumeroEntrega,
              item.marca,
              item.productoPresentacion
            )
          }

        )
        this.catalogoLotesModel = [];

      }, error => (console.log(error)),
      () => console.log(this.catalogoMarcasModel)
    );


  }



  getByIdCatalogoProducto() {

    this.productoPorNumeroEntregaService.getByIdCatalogoProducto(this.periodo, this.numeroEntrega, this.id).subscribe(

      res => {
        this.productoPorNumerosEntregaModel = res;
        this.catalogoMarcasModel = [];
        this.catalogoMarcasModel = this.catalogoMarcasModel.slice();
      },
      error => console.log(error),
      () => console.log(this.productoPorNumerosEntregaModel)

    )

  }

  getCatalogoLoteByIdCatalogoMarca(e) {
    let idCatalogoMarca = e.idCatalogoMarca;

    this.catalogoLoteService.getCatalogoLoteByIdCatalogoMarca(idCatalogoMarca).subscribe(
      res => {
        this.catalogoLotesModel = res.map(
          item => {
            //let fv = this.configService.stringToDate ( item.fechaVencimiento,"dd/MM/yy","/");


            return new CatalogoLoteModel(item.idCatalogoLote, item.numeroLote, item.fechaVencimiento, item.numeroRegistro, item.cantidad, item.catalogoMarca, item.pikings)
          }
        )
      },
      error => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'error! ' + error

        })

      },
      () => console.log(this.catalogoLotesModel)
    )



  }

  addCatalogoLote(e) {
    let d = new Date();
    let id = e.idCatalogoMarca + " - " + this.utilitariosAdicse.randomString();


    this.catalogoLotesModel.push(new CatalogoLoteModel(id, null, null, null, null, e));
    this.catalogoLotesModel = this.catalogoLotesModel.slice();
  }

  
  deleteCatalogoLote(e) {
    
    let id = e.idCatalogoMarca ;
    this.crudHttpClientServiceShared.delete(id,"catalogoMarca","delete")
    .subscribe( res=> {

      swal({
        position: 'top-end',
        type: 'success',
        title: 'Registro Eliminado',
        showConfirmButton: true,
        timer: 1500
      });

    })

  }
  verIdPiking(e) {
    let id = e.idPiking;

    swal(id);
  }

  deleteIdPiking(e){
    let id = e.idPiking;

    this.crudHttpClientServiceShared.delete(id,"piking","delete")
      .subscribe( res=> {

        swal({
          position: 'top-end',
          type: 'success',
          title: 'Registro Eliminado',
          showConfirmButton: true,
          timer: 1500
        });

      })
  }
  grabarCatalogoLote(e) {
    console.log(e);
    //let fv = this.configService.getDateString(e.fechaVencimiento);
    
    let lote = this.selectionLote;

    if (!isString(e.fechaVencimiento)) {
      e.fechaVencimiento = this.utilitariosAdicse.getDateString(e.fechaVencimiento);
    }
    //  let fv = this.utilitariosAdicse.getDateString (e.fechaVencimiento);
    //e.fechaVencimiento = fv;

    this.saving = true;
    this.catalogoLoteService.save(this.selectionLote).subscribe(
      res => {
        console.log(res);
        
        this.getPikingsByIdLote(this.selectionLote.idCatalogoLote);

        this.sumaCantidadPiking();
        this.sumaCantidadCalculada();
        this.paginador.requerimientoVolumen001SeleccionadosModel = [];
        this.paginador.refreshModel(this.paginador.dataPagination);

        swal({
          position: 'top-end',
          type: 'success',
          title: 'Registro Actualizado',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )

  }

}
