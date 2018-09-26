import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger, PageEvent, MatPaginator } from '@angular/material';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';
import { startWith } from 'rxjs/internal/operators/startWith';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';
import { ProveedorclienteModel } from '../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model';
import { ProveedorclientedireccionModel } from '../../modulo-sistema-config/tablas/proveedorcliente/proveedorclientedireccion-model';
import { ConfigService } from '../../shared/config.service';



@Component({
  selector: 'app-comp-find-proveedor-cliente-list',
  templateUrl: './comp-find-proveedor-cliente-list.component.html',
  styleUrls: ['./comp-find-proveedor-cliente-list.component.scss'],
  providers: [CrudHttpClientServiceShared]  
})
export class CompFindProveedorClienteListComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Input()
  tipodocfilter: number = 2; // tipo documetno filtrar; buscar PN o PJ

  @Input()
  agruparPorDireccion: boolean = true;
  //true = muestra el proveedorcliente agrupados por sus direcciones, es decir se mostrar la cantidad de veces segun la cantidad de direcciones, si no tiene direccion mostrara: direccion no asignada
  //false = muestra todos los proveedores agrupados por proveedorcliente


  @Output()
  getObject: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  @ViewChild(MatPaginator) paginadorHost: MatPaginator;


  public verFooter: boolean = false;

  private pageMostar: number = 0;
  public rows: number = 5;
  public totalRecords: number = 0;
  private ultimoParametroBuscado: string = '';


  public listProveedorCliente: ProveedorclienteModel[] = [];

  constructor(private crudService: CrudHttpClientServiceShared, private configService: ConfigService) {
  }

  ngOnInit() {
    
    this.paginadorHost._intl.nextPageLabel = '';
    this.paginadorHost._intl.previousPageLabel = '';        
    this.paginadorHost.hidePageSize=true;
    



    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }

    this._formControlName!.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        map(value => value)
      ).subscribe(res => {


        this.pageMostar = 0;
        this.rows = 5;
        this.ultimoParametroBuscado = res;
        this.paginadorHost.pageIndex = 0;
        this.filtrar(res);
      });


  }


  private filtrar(filterValue): void {
    if (typeof filterValue !== 'string') { 
      return; 
    }

    if (filterValue === '') { 
      this.autocomplete.closePanel(); 
      return; 
    }

    const _filtros = `documentoidentificacion.iddocumentoidentificacion:${this.tipodocfilter}:equals,razonsocial:${filterValue}:contains`;
    const filtros = JSON.stringify(this.configService.jsonFilter(_filtros));

    this.crudService.getPagination(this.pageMostar, this.rows, 'asc', 'razonsocial', filtros, 'proveedorcliente', 'pagination', null)
      .subscribe((res: any) => {
        this.listProveedorCliente = <ProveedorclienteModel[]>res.data || null;
        this.totalRecords = res.totalCount;

        this.verFooter = this.totalRecords > 4 ? true : false;
      })
  }



  public _focus(e) {
    e.target.select();
    if (this.listProveedorCliente) {
      this.autocomplete.closePanel();
    }
  }

  public _displayWith(val: ProveedorclienteModel): string {
    return val ? val.razonsocial : '';
  }


  public _onSelectionChange(event, proveedorCliente: ProveedorclienteModel, direccion: ProveedorclientedireccionModel = null): void {
    const resAgrupado = { 'proveedorcliente': proveedorCliente, 'direccion': direccion }
    if (this.agruparPorDireccion) {
      this.getObject.emit(resAgrupado);
    } else {
      // devuele un ProveedorclienteModel
      this.getObject.emit(proveedorCliente);
    }
    this.listProveedorCliente = null;
  }

  public page(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostar = event.pageIndex;
    this.filtrar(this.ultimoParametroBuscado);
  }

}
