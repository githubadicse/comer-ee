import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert2'
import { UsuarioModel } from '../usuario-model';
import { ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { FilialService } from '../../filial/filial.service';
import { FilialModel } from '../../filial/filial-model';
import { FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  providers : [CrudHttpClientServiceShared,FilialService]
})
export class UsuarioListComponent implements OnInit {
  selected : any;
  dataForm: any;
  public filialModel: FilialModel[];
  public dscfilial: string = "";
  dataPagination: any;
  public flagRefresh: boolean = false;
  id: number;
  sub: any;
  show: Boolean = true
  public usuarioModel: UsuarioModel;
  public usuariosModel: UsuarioModel[];
  public titulo: string = "Usuarios";
  public blocked: boolean;
  public showPanelBuscarFlag: boolean = false;
  public filterPage: Object;
  public displayModal: boolean = false;
  public refreshPage: boolean = false;

  @ViewChild('dt') dataTable: Table;
  Typeahead = new Subject<string>();

  constructor( private formBuilder: FormBuilder, private filialService: FilialService,private crudHttpClientServiceShared: CrudHttpClientServiceShared, private activateRoute:ActivatedRoute) { 
  }
  ngOnInit() {
    this.initObservable();
    this.getFilial();
    this.buildForm();
this.filter(1);
    // this.filterfilial();
  }
  initObservable(){
    this.Typeahead.pipe(distinctUntilChanged(),debounceTime(1000),
    ).subscribe(
      res =>{
        let value = res[0];
        let field = res[1];
        let operator = res[2];
        this.dataTable.filter(value, field, operator);
        this.filterPage = JSON.stringify(this.dataTable.filters);      
        this.refreshModel(this.dataPagination,true);
    })
  }

  filter2(value,field,operator){
    setTimeout(() => {
      this.dataTable.filter(value, field, operator);
      this.filterPage = JSON.stringify(this.dataTable.filters);      
      this.refreshModel(this.dataPagination,true);
    }, 250);
  }

  filter3(e) {
    this.filterPage = JSON.stringify(e.filters);
    this.refreshModel(this.dataPagination, true);
  }

  refreshModel(e, flagFilter?, currentPage?) {
    this.flagRefresh = false;
    if (flagFilter) {
      e.currentPage = 0;
    }
    this.dataPagination = e;
    this.crudHttpClientServiceShared.getPagination(e.currentPage == null ? 0 : e.currentPage, e.rowsForPage == null ? 10 : e.rowsForPage, "asc", e.orden, this.filterPage, e.controller, "pagination", e.paramsExtra)
       .subscribe(
        res => {
          this.usuariosModel = res.data;
          console.log(res);
      e.getTotalPages(res.totalCount, e.rowsForPage == null ? 10 : e.rowsForPage);
        }
      );
  }

  showPanelBuscar() {
    this.showPanelBuscarFlag = !this.showPanelBuscarFlag;
  }

  onActivate() {
    console.log("Activate outlet list");
    this.show = false;
  }

  onDeactivate() {
    console.log("Deactivate outlet list");
    this.sub = this.activateRoute.params.subscribe(
      params => {
        if( isUndefined(params['flagRefreshReturn']) ){
          return;
        }
        let flagRefresh  = JSON.parse(params['flagRefreshReturn']) ;
        this.refreshPage = flagRefresh;
        if(this.refreshPage){
          this.refreshModel(this.dataPagination);
        }
        this.refreshPage=false;
      }
    )
    this.show = true;
  }

  ocultarLista() {
    this.show = false;
  }

  getFilial() {
    this.filialService.getFilial()
      .subscribe(
        res => {
          this.filialModel = res;

        }
      )
  }

  buildForm() {
    this.dataForm = this.formBuilder.group({
      dscfilial: [this.dscfilial, Validators.required],
    })
  }

  cargarData() {
    this.dscfilial = this.dataForm.controls['dscfilial'].value;
  }

  changeValue(e) {
    this.cargarData();
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
        this.crudHttpClientServiceShared.delete(e.idusuario, "usuario", "delete").subscribe(
          res => {
            swal(
              'Deleted!',
              'El registro fue eliminado.',
              'success'
            )
            this.refreshPage = !this.refreshPage;
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
  compararFilial(c1: any, c2: any): boolean { return c1 && c2 ? c1.idfilial === c2.idfilial : c1 === c2; }

    filter(valor) {
      this.dataTable._filter();
      this.filterPage = JSON.stringify(this.dataTable.filters);      
      this.refreshModel(this.dataPagination,true);
    }
}
