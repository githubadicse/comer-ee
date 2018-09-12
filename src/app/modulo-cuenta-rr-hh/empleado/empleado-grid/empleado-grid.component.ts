import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { Message, ConfirmationService } from 'primeng/primeng';

import { EmpleadoModel } from '../empleado-model';
import { UsuarioEmpleadoModel } from '../../../modulo-sistema-config/usuario/usuario-empleado-model';
import { SharedService } from '../../../shared/servicio/shared.service';
import { PageEvent, MatPaginator, MatSort } from '@angular/material';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { UtilitariosAdicse } from '../../../shared/servicio/utilitariosAdicse';
import { merge, of as observableOf} from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';


@Component({
  selector: 'ad-empleado-grid',
  templateUrl: './empleado-grid.component.html',
  styleUrls: ['./empleado-grid.component.css'],
  providers : [SharedService,ConfirmationService,UtilitariosAdicse]

})


export class EmpleadoGridComponent implements OnInit {

  @Input() isVisible:boolean;

  @Output() out_isVisible:EventEmitter<any> = new EventEmitter();

  public titulo:string="Empleados";

  public empleadosModel:EmpleadoModel[] = [];
  public empleadoModel:EmpleadoModel;

  public usuarioEmpleaadosModel:UsuarioEmpleadoModel[] = [];
  public usuarioEmpleadoModel:UsuarioEmpleadoModel;


  //-comandos obligatorios para la paginacion-//
  public showPanelBuscarFlag: boolean = false;
 
  public filterPage: Object;
  public displayModal: boolean = false;
  public refreshPage: boolean = false;
  //-----------------------------------------//


  displayedColumns = ['idempleado', 'nomempleado', 'dni', 'email', 'estado', 'action'];

  // MatPaginator Inputs
  resultsLength = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isLoadingResults = true;
  isRateLimitReached = false;

  // MatPaginator Output
  pageEvent: PageEvent;


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //filter
  _filter:any = undefined;
  _filterPage:any = undefined;

  selectedRowIndex:any;
  constructor(
   
    private crudHttpClientServiceShared:CrudHttpClientServiceShared,
    private utilitariosAdicse: UtilitariosAdicse ) { }

  ngOnInit() {
   
    this.sort.sortChange.subscribe( ()=> this.paginator.pageIndex = 0 );

    this.sort.active = "nomempleado";
    this.sort.direction = "asc";


  merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap( () => {
        this.isLoadingResults = true;
        
        return this.crudHttpClientServiceShared.getPagination(this.paginator.pageIndex, this.pageSize ,this.sort.direction,this.sort.active,this._filterPage,"empleado","pagination",null)
        
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
    .subscribe(data => this.empleadosModel = data);
  }

  page(e){
    this.pageSize = e.pageSize;
  }

  filter(e) {
    this.filterPage = JSON.stringify(e.filters);
  }

  refreshModel(e){
    this.empleadosModel = e;
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

}


