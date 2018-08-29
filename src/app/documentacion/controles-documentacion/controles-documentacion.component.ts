import { Component, OnInit } from '@angular/core';
import { TipodocumentoModel } from '../../modulo-sistema-config/tipodocumento/tipodocumento-model';

@Component({
  selector: 'app-controles-documentacion',
  templateUrl: './controles-documentacion.component.html',
  styles: []  
})
export class ControlesDocumentacionComponent implements OnInit {

  filtroro: string = "";
  _disabledSerie: boolean = false;
  _mostrarSerie: boolean = true;
  documentoInit: any = <TipodocumentoModel>JSON.parse('{"idTipoDocumento": 122, "codigoSunat": "0002", "dscTipoDocumento": "FACTURA" }');

  valorRecibido: any;

  constructor() { }

  ngOnInit(): void {

    //this
  }


  setFiltro(value: string) {
    this.filtroro = value;
  }
}
