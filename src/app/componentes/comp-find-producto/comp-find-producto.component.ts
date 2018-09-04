import { Component, OnInit, Input, ViewChildren, QueryList, HostListener, Output, EventEmitter } from '@angular/core';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';
import { ProductoModel } from '../../modulo-almacen/producto/model/producto.model';
import { ConfigService } from '../../shared/config.service';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/internal/operators/startWith';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/internal/operators/map';
import { AlmacenModel } from '../../modulo-almacen/almacen/almacen-model';

@Component({
  selector: 'app-comp-find-producto',
  templateUrl: './comp-find-producto.component.html',
  styleUrls: ['./comp-find-producto.component.scss']
})
export class CompFindProductoComponent implements OnInit {
  private productoRespuesta: ProductoModel;
  private LastCharFind: string = ''; // ultimo caracter buscado  
  private Idalmacen: number = 1;    

  private pageMostar: number = 0;
  private rows: number = 10;
  
  public totalRecords: number = 0;
  public listProductos: any;
  public listAlmacen: AlmacenModel[];
  public frmCtrl_textBuscar = new FormControl();
  public procesando: boolean = true;

  private indexSelect: number = 0;
  @ViewChildren('rowSelect') rowsProductos: QueryList<any> // para la seccion con las flechas del teclado up down


  @Input() IdalmacenPreSeleccionado: number = 1;  //idalmacen preseleccionado
  @Input() disabledAlamcen: boolean = false; //deshabilitar lista de almacen
  @Output() getObject: EventEmitter<ProductoModel> = new EventEmitter();

  
  
  constructor(public crudService: CrudHttpClientServiceShared, private configService: ConfigService ) { }

  ngOnInit() {
    this.Idalmacen = this.IdalmacenPreSeleccionado;

    this.maestros();

    this.frmCtrl_textBuscar.valueChanges      
        .pipe(
        startWith(''),
        //distinctUntilChanged(),
        debounceTime(500),
      map(val => val)       
    ).subscribe(value => this._filterProductos(value));
        
  }

  private _filterProductos(cadenaBuscar: string = ''): void {        
    this.LastCharFind = cadenaBuscar;
    this.indexSelect = 0;
    //,producto.marca.dscmarca:${cadenaBuscar}:contains,producto.categoria.dsccategoria:${cadenaBuscar}:contains
    const _filtros = `almacen.idalmacen:${this.Idalmacen}:equals,producto.dscproducto:${cadenaBuscar}:contains`;    
    const filters = JSON.stringify(this.configService.jsonFilter(_filtros));
    
    // console.log(filters);
    this.crudService.getPagination(this.pageMostar === null ? 0 : this.pageMostar, this.rows === null ? 10 : this.rows, 'asc', 'producto.dscproducto', filters, 'stockactual', 'pagination', null)
      .subscribe(res => {
        this.totalRecords = res.totalCount;
        this.listProductos = res.data;
        this.procesando = false;
      });
  }

  private maestros(): void {
    // almacenes
    this.crudService.getall('almacen','getall').subscribe( res => {
      this.listAlmacen = res
      // if (!this.IdalmacenPreSeleccionado) { 
      //   this.IdalmacenPreSeleccionado = this.listAlmacen[0].idalmacen;
      //   this._filterProductos(this.LastCharFind);
      // }
    });
  }

  public paginate(event): void {
    this.rows = event.rows;
    this.pageMostar = event.page;
    this._filterProductos(this.LastCharFind);
  }

  public compareAlmacen(c1: any, c2: number): boolean { return c1.idalmacen === c2; }
  
  public changeSelectAlamcen(value) : void {
    this.procesando = true;
    this.Idalmacen = value.idalmacen;
    this._filterProductos(this.LastCharFind);
  }

  // emite la respuesta
  public resEmit(index:number): void {
    this.productoRespuesta = <ProductoModel>this.listProductos[index].producto;
    this.getObject.emit(this.productoRespuesta);
  }

  // seleccion de los items con las flechas del teclado up down
  @HostListener('keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    
    if (event.keyCode === 38) { // arriba  
      this.indexSelect--;
      this.indexSelect = this.indexSelect < 0 ? 0 : this.indexSelect;
    }
    if (event.keyCode === 40) { // abajo
      this.indexSelect++;
      this.indexSelect = this.indexSelect >= this.rowsProductos.length ? this.rowsProductos.length - 1 : this.indexSelect;
    
    }

    if (event.keyCode === 13) {
      this.resEmit(this.indexSelect);      
    }
  }
}
