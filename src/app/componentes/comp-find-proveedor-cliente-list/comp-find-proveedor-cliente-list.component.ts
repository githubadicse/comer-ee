import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';
import { startWith } from 'rxjs/internal/operators/startWith';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';
import { ProveedorclienteModel } from '../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model';
import { ProveedorclientedireccionModel } from '../../modulo-sistema-config/tablas/proveedorcliente/proveedorclientedireccion-model';



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

  @Output()
  getObject: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;  
  

  public listProveedorCliente: ProveedorclienteModel[] = [];  

  constructor(private crudService: CrudHttpClientServiceShared) {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this._formControlName!.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        map(value => value)
    ).subscribe(res => this.filtrar(res));
        
  }


  private filtrar(filterValue): void {    
    if (typeof filterValue !== 'string') {return;}
    if (filterValue === '') { this.autocomplete.closePanel(); return; }

    const filtros = `documentoidentificacion.iddocumentoidentificacion:${this.tipodocfilter}:equals,razonsocial:${filterValue}:contains`;
    this.crudService.getAllByFilter('proveedorcliente', 'getByFilter', filtros).subscribe(
      (res: any) => {
        this.listProveedorCliente = <ProveedorclienteModel[]>res || null;
        console.log(this.listProveedorCliente);
      }
    )    
  }

  ngOnInit() {
  }

  public _focus(e){
    e.target.select();
    if(this.listProveedorCliente) {
      this.autocomplete.closePanel();
    }
  }

  public _displayWith(val: ProveedorclienteModel): string {    
    return val ? val.razonsocial : '';
  }
  

  public _onSelectionChange(event, proveedorCliente:ProveedorclienteModel, direccion: ProveedorclientedireccionModel): void {    
    this.getObject.emit({'proveedorcliente': proveedorCliente, 'direccion': direccion});
    this.listProveedorCliente=null;
  }  

}
