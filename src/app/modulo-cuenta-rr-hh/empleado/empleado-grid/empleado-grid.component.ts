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
import swal from 'sweetalert2';


@Component({
  selector: 'ad-empleado-grid',
  templateUrl: './empleado-grid.component.html',
  styleUrls: ['./empleado-grid.component.css'],
  providers : [SharedService,ConfirmationService,UtilitariosAdicse]

})


export class EmpleadoGridComponent implements OnInit {
 
  @Input() isVisible:boolean;
  public db_empleado: any;
  @Output() out_isVisible:EventEmitter<any> = new EventEmitter();
  public showChild: boolean = false;
  public titulo:string="Empleado";
  public http_model = 'empleado';
  public empleadosModel:EmpleadoModel[] = [];
  public empleadoModel:EmpleadoModel;
  public totalRecords: number;
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
    private crudService: CrudHttpClientServiceShared,
    private sharedService:SharedService,
    private crudHttpClientServiceShared:CrudHttpClientServiceShared,
    private utilitariosAdicse: UtilitariosAdicse ) { }

  ngOnInit() {

    this.paginator._intl.itemsPerPageLabel="Reg Por Pag Emp";
   
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
    this.maestros();
  }
  create(){
    this.isVisible = false;
    this.out_isVisible.emit({'isVisible':false,'accion':'create'});
    this.maestros();
  }

  private maestros(): void {
    this.crudService.getall(this.http_model, 'getall').subscribe(
      (res: any) => {
         this.db_empleado = res; 
         this.totalRecords = res.totalCount;
         console.log(res); 
        }
      );
  }

  highlight(row) {
    this.selectedRowIndex = row.idProductoPorNumeroEntrega;
  }

  delete(e) {
    swal({
      title: 'Esta Seguro?',
      text: "Esta seguro de eliminar el usuario: ",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {
      if (result.value) {
        this.crudHttpClientServiceShared.delete(e.idempleado, "empleado", "delete").subscribe(
          res => {
            swal(
              'Deleted!',
              'El registro fue eliminado.',
              'success'
            )
            this.refreshPage = !this.refreshPage;
            this.maestros();
          },
          error => {
            swal(
              'Deleted!',
              'El Registro No se elimino.' + error,
              'error'
            )
          }
        )
      }
    })
  }

  onActivateChild() { this.showChild = true; }
  onDeactivateChild() {
    this.showChild = false;
    if (this.sharedService.refreshByStorage(this.http_model)) {
       this.maestros()
    }
  }

}


