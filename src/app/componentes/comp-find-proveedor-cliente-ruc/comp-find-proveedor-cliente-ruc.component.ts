import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProveedorclientedireccionModel } from '../../modulo-almacen/proveedorcliente/proveedorclientedireccion-model';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';

@Component({
  selector: 'app-comp-find-proveedor-cliente-ruc',
  templateUrl: './comp-find-proveedor-cliente-ruc.component.html',
  styleUrls: ['./comp-find-proveedor-cliente-ruc.component.scss']
})
export class CompFindProveedorClienteRucComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Output()
  getObject: EventEmitter<ProveedorclientedireccionModel> = new EventEmitter();

  public proveedor_cliente: ProveedorclientedireccionModel;

  public cargando: boolean = false;

  constructor(private crudService: CrudHttpClientServiceShared) { }

  ngOnInit() {
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;      
    }
  }

  public buscarRUC(dni: string): void {
    const filtros = `documentoidentificacion.iddocumentoidentificacion:2:equals,nrodocumento:${dni}:equals`;
    this.cargando = true;
    this.crudService.getAllByFilter('proveedorcliente', 'getByFilter', filtros).subscribe(
      (res: any) => {
        this.proveedor_cliente = <ProveedorclientedireccionModel>res[0] || null;
        if (!this.proveedor_cliente) { this._formControlName.setErrors({ 'incorrect': true, 'msj': 'No se encontro registros.' }); }

        this.getObject.emit(this.proveedor_cliente);
        console.log(this.proveedor_cliente)
        console.log(this._formControlName);
        this.cargando = false;
      }
    )
  }



}
