import { Component, OnInit, Input, ViewChildren, QueryList, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';

import { ConfigService } from '../../shared/config.service';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/internal/operators/startWith';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/internal/operators/map';

import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { ProductoModel } from '../../modulo-sistema-config/tablas/producto/model/producto.model';
import { AlmacenModel } from '../../modulo-sistema-config/tablas/almacen/almacen-model';
import { ProductoService } from '../../modulo-sistema-config/tablas/producto/service/producto.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-comp-find-producto',
  templateUrl: './comp-find-producto.component.html',
  styleUrls: ['./comp-find-producto.component.scss'],
  providers: [ProductoService]
})


export class CompFindProductoComponent implements OnInit {
  
 
  private productoRespuesta: ProductoModel;
  private ultimoParametroBuscado: string = ''; // ultimo caracter buscado  
  private Idalmacen: number = 1;    

  private pageMostar: number = 0;
  public rows: number = 5;  
  public totalRecords: number = 0;

  public listProductos: any;
  public listAlmacen: AlmacenModel[];  
  public procesando: boolean = true;  
  private indexSelect: number = 0;
  @ViewChildren('rowSelect') rowsProductos: QueryList<any> // para la seccion con las flechas del teclado up down
  
  
  
  @Input() _formControlName = new FormControl();
  @Input() myControl = new FormControl();
  @Input() IdalmacenPreSeleccionado: number = 1;  //idalmacen preseleccionado
  @Input() parametroBuscar: string = '';  // parametro a buscar preseleccionado
  @Input() disabledAlamcen: boolean = false; //deshabilitar lista de almacen
  @Input() pageSizeInit: number = 5; //Cantidad de filas a mostrar inicialmente
  @Output() getObject: EventEmitter<ProductoModel> = new EventEmitter();

  @ViewChild(MatPaginator) paginatorProducto: MatPaginator;

  @ViewChild('tablaContent') tablaContent: ElementRef;
  @ViewChild('cardBody') cardBody: ElementRef;  
  private lastOffsetHeightCardBody: number=0; // uso interno para calcular las filas a mostrar // ultima resize Heigh de tablaContent
  
  
  constructor(
    private productoService: ProductoService, 
    public crudService: CrudHttpClientServiceShared, 
    private configService: ConfigService ) {                      
  }
 

  ngAfterViewChecked(): void {
    this.CalcRowsMostrarSizeScreen();    
  }
 
  ngOnInit() {
    

    this.rows = this.pageSizeInit; 

    this.paginatorProducto._intl.nextPageLabel = '';
    this.paginatorProducto._intl.previousPageLabel = '';        
    this.paginatorProducto.hidePageSize=true; 

    this.Idalmacen = this.IdalmacenPreSeleccionado;

    this.maestros(); 
    
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
        
    this._formControlName!.valueChanges
        .pipe(
          startWith(''),
          distinctUntilChanged(),
          debounceTime(500),
          map(val => val)
        ).subscribe(value => {

          this.pageMostar = 0;
          // this.rows = 5;
          this.paginatorProducto.pageIndex = 0;

          this._filterProductos(value)
        });
                
  }

  // preseleccionar busqueda
  ngOnChanges() {    
    this._formControlName.setValue(this.parametroBuscar);    
  }

  private _filterProductos(cadenaBuscar: string = ''): void {
    this.ultimoParametroBuscado = cadenaBuscar;
    this.indexSelect = 0;
    //producto.dscproducto:${cadenaBuscar}:contains,producto.marca.dscmarca:${cadenaBuscar}:contains,producto.categoria.dsccategoria:${cadenaBuscar}:contains
    const _filtros = `almacen.idalmacen:${this.Idalmacen}:equals:and,producto.dscproducto:${cadenaBuscar}:contains:or`;
    const filters = JSON.stringify(this.configService.jsonFilter(_filtros));
    
    console.log('filtro', filters);
    this.pageMostar === null ? 0 : this.pageMostar;
    this.rows === null ? this.pageSizeInit : this.rows;

    this.productoService.getProductoByParametroPageable(this.pageMostar, this.rows, cadenaBuscar,this.Idalmacen)
      .subscribe((res: any) => {
        this.totalRecords = res.totalCount;
        this.listProductos = res.data;
        this.procesando = false;        
      });
  }

  private maestros(): void {
    // almacenes
    this.crudService.getall('almacen','getall').subscribe( res => {
      this.listAlmacen = res      
    });
  }

  public page(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostar = event.pageIndex;
    this._filterProductos(this.ultimoParametroBuscado);
  }

  public compareAlmacen(c1: any, c2: number): boolean { return c1.idalmacen === c2; }
  
  public changeSelectAlamcen(value) : void {
    this.procesando = true;
    this.Idalmacen = value.idalmacen;
    this._filterProductos(this.ultimoParametroBuscado);
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

  
  // escucha el resize de la ventana para llamar a CalcRowsMostrarSizeScreen
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.CalcRowsMostrarSizeScreen();        
  }


  // calcula el alto del body y de la tabla para aumentar, si existe espacio, mas registros (filas) en la vista (tabla)
  private CalcRowsMostrarSizeScreen(): void {         
    const heightSizeCardBody: number = Math.round(this.cardBody.nativeElement.offsetHeight);
    if (this.lastOffsetHeightCardBody === heightSizeCardBody || this.paginatorProducto.getNumberOfPages() === this.paginatorProducto._pageIndex) return;

    const heightSizeTable: number = Math.round(this.tablaContent.nativeElement.offsetHeight);    
    let countRowsAdd = Math.round((heightSizeCardBody - heightSizeTable)/55);
    countRowsAdd  = countRowsAdd > 0 ? countRowsAdd : 0;
    
    if ( countRowsAdd > 0 ) {
      countRowsAdd = this.rows + (countRowsAdd); 
    
      this.lastOffsetHeightCardBody = heightSizeCardBody;
      this.rows = countRowsAdd;       
      this._filterProductos(this.ultimoParametroBuscado);
    } 

    
  }
}
