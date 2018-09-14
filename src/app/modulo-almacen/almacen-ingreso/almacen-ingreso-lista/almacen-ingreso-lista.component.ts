import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';

import { Message } from 'primeng/primeng';

import { AlmacenIngresoModel } from '../almacen-ingreso-model';
import { PageEvent, MatPaginator, MatSort } from '@angular/material';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { merge,of as observableOf, Observable, Subject } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ConfigService } from '../../../shared/config.service';
import { FormControl } from '@angular/forms';
import { AlmacenModel } from '../../../modulo-sistema-config/tablas/almacen/almacen-model';
import { UtilitariosAdicse } from '../../../shared/servicio/utilitariosAdicse';

@Component({
  selector: 'ad-almacen-ingreso-lista',
  templateUrl: './almacen-ingreso-lista.component.html',
  styleUrls: ['./almacen-ingreso-lista.component.css'],
  providers : [CrudHttpClientServiceShared,UtilitariosAdicse]
})
export class AlmacenIngresoListaComponent implements OnInit {
  showLista: boolean = true;

  public almacenIngresosModel:AlmacenIngresoModel[]=[];

  public titulo:string = "Ingreso Almacen";

  //-comandos obligatorios para la paginacion-//
  private msgPopup: Message[] = [];
  public blocked: boolean;

  public showPanelBuscarFlag: boolean = false;

  public filterPage: Object;
  public displayModal: boolean = false;
  public refreshPage: boolean = false;
  //-----------------------------------------//


  displayedColumns = ['fecha','nrodoc', 'proveedorcliente.razonsocial', 'nrodocproveedor',  'action'];

  // MatPaginator Inputs
  resultsLength = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isLoadingResults = false;
  isRateLimitReached = false;

  // MatPaginator Output
  pageEvent: PageEvent;

  @Input() isVisible:boolean;

  @Output() out_isVisible:EventEmitter<any> = new EventEmitter();

  public idFilial:number=1;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //filter
  _filter:any = {} ;
  _filterPage = undefined;
  _merge;

  //observable auxiliar.
  Typeahead = new Subject<string>();

  selectedRowIndex:any;  

  myControl = new FormControl();

  constructor(private crudHttpClientServiceShared:CrudHttpClientServiceShared, private configService:ConfigService, private utilitariosAdicse:UtilitariosAdicse) { 
    
  }

  ngOnInit() {

    this.Typeahead.pipe(
    ).subscribe();


    this.idFilial = this.configService.getIdFilialToken();
    this._filter;

    
    this.sort.sortChange.subscribe( ()=> this.paginator.pageIndex = 0 );

    this.sort.active = "fecha";
    this.sort.direction = "asc";


   this._merge = merge(this.sort.sortChange, this.paginator.page, this.Typeahead)
    .pipe(
      startWith({}),
      switchMap( () => {
        this.isLoadingResults = true;
        return this.crudHttpClientServiceShared.getPagination(this.paginator.pageIndex, this.pageSize ,this.sort.direction,this.sort.active,this._filterPage,"ing001","pagination",null)
        
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
    //.subscribe(data => this.almacenIngresosModel = data);    
    
    //la carga de datos se realiza despues de seleccionar el almacen..... con la funcion
    //f_selected que devuelve el compomente almacen.
    
  }

  f_selected(e){
    
    let idAlmacen:number = e.idalmacen;
    this._filterPage = JSON.stringify( this.utilitariosAdicse.Tablefilter(this._filter,idAlmacen,'almacen.idalmacen','equals'  ));
    this.Typeahead.next("dato");
    this._merge.subscribe(data => this.almacenIngresosModel = data);    
    
  }


  filter(e) {
    this.filterPage = JSON.stringify(e.filters);
  }
  refreshModel(e) {
    this.almacenIngresosModel = e;
  }
  page(e){
    this.pageSize = e.pageSize;
  }
  showPanelBuscar() {
    this.showPanelBuscarFlag = !this.showPanelBuscarFlag;
  }

  edit(e){
    
    this.isVisible = false;
    this.out_isVisible.emit({'isVisible':false,'accion':'edit','element':e});

  }
  create(){
    this.isVisible = false;
    this.out_isVisible.emit({'isVisible':false,'accion':'create'});
  }

  highlight(row) {
    this.selectedRowIndex = row.idProductoPorNumeroEntrega;
  }
  ocultarLista(){
    this.showLista = false;
  }


}
