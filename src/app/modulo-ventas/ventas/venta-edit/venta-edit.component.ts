import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Subject } from 'rxjs';

import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { TipodocumentoModel } from '../../../modulo-sistema-config/tipodocumento/tipodocumento-model';

import { MonedaModel } from '../../../modulo-sistema-config/tablas/moneda/moneda-model';
import { ProveedorclienteModel } from '../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model';
import { ProveedorclienteService } from '../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente.service';

@Component({
  selector: 'ad-venta-edit',
  templateUrl: './venta-edit.component.html',
  styleUrls: ['./venta-edit.component.css'],
  providers: [CrudHttpClientServiceShared, ProveedorclienteService]
})
export class VentaEditComponent implements OnInit {

  people3Loading: boolean = false;
  public tipoDocumentosModel: TipodocumentoModel[];
  public monedasModel: MonedaModel[];
  public proveedorClientesModel: ProveedorclienteModel[];

  people3Typeahead = new Subject<string>();
  es: any;

  constructor(private crudHttpClientServiceShared: CrudHttpClientServiceShared, private proveedorclienteService: ProveedorclienteService, private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }


    this.getComprobantesDeVenta();
    this.getMonedas();
    this.getProveedorClienteFilterGlobal();
    this.loadPeople3();
  }

  getComprobantesDeVenta() {
    this.crudHttpClientServiceShared.getall("tipodocumento", "getall").subscribe
      (
      res => {
        this.tipoDocumentosModel = res.map(
          item => {
            debugger;
            return new TipodocumentoModel(item.idTipoDocumento, item.dscTipoDocumento, item.codigoSunat);
          }
        )
      },
      error => {
        console.log(error)
      },
      () => console.log(this.tipoDocumentosModel)
      )
  }

  getMonedas() {
    this.crudHttpClientServiceShared.getall("moneda", "getall").subscribe
      (
      res => {
        this.monedasModel = res.map(
          item => {
            debugger;
            return new MonedaModel(item.idMoneda, item.dscMoneda);
          }
        )
      },
      error => {
        console.log(error)
      },
      () => console.log(this.monedasModel)
      )
  }

  getProveedorClienteFilterGlobal() {
    this.proveedorclienteService.filterGlobal("A").subscribe(
      res => {
        this.proveedorClientesModel = res.map(
          item => {
            return new ProveedorclienteModel(item.idproveedorcliente, item.razonsocial, item.representante, item.documentoidentificacion, item.nrodocumento, item.telefono, item.email, item.contacto1, item.contacto2, item.proveedorclientedireccions)
          }
        )
      },
      error => {
        console.log(error)
      },
      () => console.log(this.monedasModel)
    )
  }

  private loadPeople3() {
    this.people3Typeahead.pipe(
      tap(() => this.people3Loading = true),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(term =>
        this.proveedorclienteService.filterGlobal(term)
      ),
    ).subscribe(
      res => {
        this.proveedorClientesModel = res.map(
          item => {
            return new ProveedorclienteModel(item.idproveedorcliente, item.razonsocial, item.representante, item.documentoidentificacion, item.nrodocumento, item.telefono, item.email, item.contacto1, item.contacto2, item.proveedorclientedireccions)
          }
        );
        this.people3Loading = false;
        this.cd.markForCheck();
      },
      () => {
        
        this.proveedorClientesModel = [];
      }

    )
  }

}
