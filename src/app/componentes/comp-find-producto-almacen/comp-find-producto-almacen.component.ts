import { Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { ProductoModel } from '../../modulo-sistema-config/tablas/producto/model/producto.model';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material';

import { ProductoService } from '../../modulo-sistema-config/tablas/producto/service/producto.service';

import { startWith } from 'rxjs/internal/operators/startWith';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/internal/operators/map';

import { ComponentesUtilitarios } from '../componentes.utilitarios';

@Component({
  selector: 'app-comp-find-producto-almacen',
  templateUrl: './comp-find-producto-almacen.component.html',
  styleUrls: ['./comp-find-producto-almacen.component.scss'],
  providers: [ProductoService, ComponentesUtilitarios]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompFindProductoAlmacenComponent implements OnInit {

  private productoRespuesta: ProductoModel;
  private ultimoParametroBuscado: string = ''; // ultimo caracter buscado    

  private pageMostar: number = 0;
  public rows: number = 5;  
  public totalRecords: number = 0;

  public listProductos: any;
  // public listAlmacen: AlmacenModel[];  
  public procesando: boolean = true;  
  private indexSelect: number = 0;
  @ViewChildren('rowSelect') rowsProductos: QueryList<any> // para la seccion con las flechas del teclado up down  
  
  @Input() _formControlName = new FormControl();
  @Input() myControl = new FormControl();  
  @Input() parametroBuscar: string = '';  // parametro a buscar preseleccionado  
  @Input() pageSizeInit: number = 5; //Cantidad de filas a mostrar inicialmente
  @Output() getObject: EventEmitter<ProductoModel> = new EventEmitter();  

  @ViewChild(MatPaginator) paginatorProducto: MatPaginator;

  @ViewChild('tablaContent') tablaContent: ElementRef;
  @ViewChild('cardBody') cardBody: ElementRef;    
  
  @ViewChild('txtparametro') txtparametro : ElementRef;
  
  constructor(
    private productoService: ProductoService,          
    private componentesUtilitarios: ComponentesUtilitarios
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.txtparametro.nativeElement.focus();      
    }, 100);
    this.rows = this.pageSizeInit; 

    this.paginatorProducto._intl.nextPageLabel = '';
    this.paginatorProducto._intl.previousPageLabel = '';        
    this.paginatorProducto.hidePageSize=true;         
    
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
          this.paginatorProducto.pageIndex = 0;

          this._filterProductos(value)
        });
        
  }

  ngAfterViewChecked(): void {
    this.CalcRowsMostrarSizeScreen();    
  }

  // preseleccionar busqueda
  ngOnChanges() {    
    this._formControlName.setValue(this.parametroBuscar);    
  }

  private _filterProductos(cadenaBuscar: string = ''): void {
    this.ultimoParametroBuscado = cadenaBuscar;
    this.indexSelect = 0;

    this.pageMostar === null ? 0 : this.pageMostar;
    this.rows === null ? this.pageSizeInit : this.rows;

    this.productoService.getProductoByParametroSoloProductoPageable(this.pageMostar, this.rows, cadenaBuscar)
      .subscribe((res: any) => {
        this.totalRecords = res.totalCount;
        this.listProductos = res.data;
        this.procesando = false;
      });
  }

  public page(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostar = event.pageIndex;
    this._filterProductos(this.ultimoParametroBuscado);
  }

  // emite la respuesta
  public resEmit(index:number): void {
    this.productoRespuesta = <ProductoModel>this.listProductos[index];
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
    const heightSizeTable: number = Math.round(this.tablaContent.nativeElement.offsetHeight);
    this.componentesUtilitarios.CalcRowsViewSizeScreen(heightSizeCardBody,heightSizeTable, this.paginatorProducto);  
  }

}
