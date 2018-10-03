import { Component, OnInit, ViewChild} from '@angular/core';

import { AlmacenIngresoModel } from '../almacen-ingreso-model';
import { MatPaginator, MatSort } from '@angular/material';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { merge,of as observableOf, Observable, Subject } from 'rxjs';
import { startWith, switchMap, map, catchError, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ConfigService } from '../../../shared/config.service';
import { FormControl } from '@angular/forms';
import { SharedService } from '../../../shared/servicio/shared.service';
import { MSJ_ALERT_BORRAR, MSJ_SUCCESS_TOP_END } from '../../../shared/config.service.const';
import swal from 'sweetalert2';


@Component({
  selector: 'ad-almacen-ingreso-lista',
  templateUrl: './almacen-ingreso-lista.component.html',
  styleUrls: ['./almacen-ingreso-lista.component.css'],
  providers : [
    CrudHttpClientServiceShared,
    SharedService
  ]

})
export class AlmacenIngresoListaComponent implements OnInit {
  showLista: boolean = true;
  showChild: boolean = false;

  public idRegistroModificar: number;

  public titulo:string = "Ingreso Almacen";

  public almacenIngresosModel:AlmacenIngresoModel[]=[];  

  // MatPaginator Inputs
  resultsLength = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  
  @ViewChild(MatPaginator) matPaginatorIngreso: MatPaginator;  
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['fecha','nrodoc', 'proveedorcliente.razonsocial', 'nrodocproveedor',  'action'];  
  // parametros de filtro o busqueda
  displayedColumnsFilters = ['fecha','nrodoc', 'proveedorcliente.razonsocial', 'nrodocproveedor'];


  idAlmacen: number;
  parametroBusqueda: string = '';

  formControlBusqueda: FormControl = new FormControl();

  isLoadingResults = false;
  isRateLimitReached = false;
  
  idFilial:number=1;

  //filter
  _filter:any = {} ;
  _filterPage = undefined;
  _merge;

  //observable auxiliar.
  Typeahead = new Subject<string>();
  selectedRowIndex:any;  

  public rowIndexCondirmDelete: number = null; // index de la fila a eliminar , para mostrar la barra de confirmarcion
  
  
  constructor(
    private crudHttpClientServiceShared:CrudHttpClientServiceShared, 
    private configService:ConfigService      
    ) {    
  }


  ngOnInit() {
        
    //this.paginatorLista._intl.itemsPerPageLabel="Reg Por Pag.x"
    this.matPaginatorIngreso._intl.itemsPerPageLabel="Reg Por Pag."
    this.Typeahead.pipe(
      map( dato=>{
        console.log("Dato " + dato);
      })
     ).subscribe();


    this.idFilial = this.configService.getIdFilialToken();
    this._filter;

    this.formControlBusqueda!.valueChanges
    .pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(600),
      map(val => val)
    ).subscribe(value => {

      this.parametroBusqueda = value.trim().toLowerCase();
      this.getArrayFilterTable();      
      this.Typeahead.next("dato");

    });

    this.sort.sortChange.subscribe( ()=> this.matPaginatorIngreso.pageIndex = 0 );

    this.sort.active = "fecha";
    this.sort.direction = "asc";


   this._merge = merge(this.sort.sortChange, this.matPaginatorIngreso.page, this.Typeahead)
    .pipe(
      startWith({}),
      switchMap( () => {
        return this.crudHttpClientServiceShared.getPaginaionWithFilter(this.matPaginatorIngreso.pageIndex, this.pageSize ,this.sort.direction,this.sort.active,this._filterPage,"ing001","paginacion",null)
        
      }),
      map(
        data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;          
          return data.data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })      
    )
    
    
  }

  f_selected(e){
    
    this.idAlmacen = e.idalmacen;    
    this.getArrayFilterTable(); // obtiene los filtros
        
    this.isLoadingResults = true;
    this.Typeahead.next("dato");
    this._merge.subscribe(data => {
      this.almacenIngresosModel = data;
    });    
    
  }

  // devuelve los filtros en formato com.adicse.comercial.specification.Filter;
  // listo para enviar al back end;
  getArrayFilterTable() {        
    let filtros: any[] = [];
    this.displayedColumnsFilters.map(x => {
      filtros.push({'field': x,'operator': 'contains', 'value': this.parametroBusqueda})
    });

    // agrega la condicion incial que ira con el operador ligico "and"
    filtros.unshift({'field': 'almacen.idalmacen','operator': 'eq', 'value': this.idAlmacen});    
    
    this._filterPage  = this.configService.jsonFilterTablePrime(filtros);
  }


  delete(e, index): void {
    swal(MSJ_ALERT_BORRAR).then((res: any) => {
      if(res.value) {
        this.crudHttpClientServiceShared.delete(e.iding001, 'ing001', 'delete').subscribe(res => { 
          swal(MSJ_SUCCESS_TOP_END); 
          this.almacenIngresosModel.splice(index,1);
          this.Typeahead.next("dato");
        });
      }
    });
  }

  page(e){
    this.pageSize = e.pageSize;
  }

  changeVerLista(): void { this.showLista = !this.showLista; }

  modificarRegistro(id: number): void {    
     this.idRegistroModificar = id; 
     this.changeVerLista();
  }

  nuevoRegistro(): void {
    this.idRegistroModificar = null; 
     this.changeVerLista();
  }

  actualizarLista(isUpdate: boolean): void {
    if (isUpdate) {
      this.Typeahead.next("dato");
    }
    this.changeVerLista();
  }

}
