import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MedioPagoModel } from '../../../modulo-sistema-config/tablas/medio-pago/medio-pago.model';
import { VentaComponentesService } from '../venta-componentes.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-venta-forma-pago',
  templateUrl: './venta-forma-pago.component.html',
  styleUrls: ['./venta-forma-pago.component.scss']
})
export class VentaFormaPagoComponent implements OnInit {

  private precioTotalPagarSubscription: Subscription;

  listPago: any[] = [];
  form: FormGroup;

  montoPagar = 0;
  montoDiferencia = 0;
  montoDiferenciaCalc = 0;
  sumTotal = 0;
  datosValidos = false;

  montoMaximo = 1000000;

  private medioPago: MedioPagoModel;

  constructor(
    private formBuilder: FormBuilder,
    private ventaComponentesService: VentaComponentesService) { }

  ngOnInit() {

    this.precioTotalPagarSubscription = this.ventaComponentesService.precioTotalPagar$
      .subscribe(res => { this.montoPagar = res; });

    this.form = this.formBuilder.group({
      formapago: ['', Validators.required],
      importe: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.max(this.montoMaximo)]],
      obs: [''],
    });

  }

  addFormaPago(): void {
    if ( !this.form.valid ) { return; }
    const formaPago = this.form.value;

    if ( formaPago.importe === 0) { return; }

    this.listPago.push(formaPago);

    this.getSumTotalFormaPago();
    this.form.reset();
  }

  _getObject($event: MedioPagoModel) {
    this.medioPago =  $event;

    this.montoMaximo = 10000000;
    if (this.medioPago.dscMedioPago.toLowerCase() !== 'efectivo' && this.medioPago.dscMedioPago.toLowerCase() !== 'contado') {
      this.montoMaximo = this.montoDiferencia;
    }
  }

  private getSumTotalFormaPago(): void {
    this.sumTotal = this.listPago.map(t => t.importe).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
    this.montoDiferencia = this.montoPagar - this.sumTotal;
    this.montoDiferenciaCalc = this.sumTotal - this.montoPagar;

    this.datosValidos = this.montoDiferencia <= 0 ? true : false;
    this.checkValid();
  }

  validarImporte( val: number ) {
    if (this.medioPago.dscMedioPago.toLowerCase() === 'efectivo' || this.medioPago.dscMedioPago.toLowerCase() === 'contado') { return; }

    if (val > this.montoDiferencia ) {
      const valMax = this.montoDiferencia < 0 ? 0 : this.montoDiferencia;
      this.form.controls['importe'].patchValue(valMax);
    }
  }

  removeItem( index: number ): void {
    this.listPago.splice(index, 1);
    this.getSumTotalFormaPago();
  }

  private checkValid(): void {
    this.ventaComponentesService.setCheckValid('tipopago', this.datosValidos);
  }

}
