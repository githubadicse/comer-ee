import { Component, OnInit } from '@angular/core';
import { TipodocumentoModel } from '../../../modulo-sistema-config/tipodocumento/tipodocumento-model';
import { VentaComponentesService } from '../venta-componentes.service';

@Component({
  selector: 'app-venta-comprobante',
  templateUrl: './venta-comprobante.component.html',
  styleUrls: ['./venta-comprobante.component.scss']
})

export class VentaComprobanteComponent implements OnInit {

  private tipoComprobante: TipodocumentoModel = null;
  constructor( private ventaComponentesService: VentaComponentesService ) { }

  ngOnInit() {
    this.checkValid();
  }

  _getObject(e: TipodocumentoModel) {
    this.tipoComprobante = e;
    this.ventaComponentesService.setExigeCliente(this.tipoComprobante.exigecliente);
    this.checkValid();
  }

  private checkValid(): void {
    const valid = this.tipoComprobante ? true : false;
    this.ventaComponentesService.setCheckValid('comprobante', valid);
  }
}
