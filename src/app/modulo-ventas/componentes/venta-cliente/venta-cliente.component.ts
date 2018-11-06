import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProveedorclienteModel } from '../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VentaComponentesService } from '../venta-componentes.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-venta-cliente',
  templateUrl: './venta-cliente.component.html',
  styleUrls: ['./venta-cliente.component.scss']
})
export class VentaClienteComponent implements OnInit, OnDestroy {
  private exigClienteSubscription: Subscription;

  requiereCliente = false; // dato desde el servicio

  proveedorCliente: ProveedorclienteModel;
  form: FormGroup;



  dataRpt: {
    nrodocumento: '0',
    razonsocial: 'PUBLICO EN GENRAL',
    direccion: '',
  };

  constructor(
      private formBuilder: FormBuilder,
      public ventaComponentesService: VentaComponentesService,
      ) { }

  ngOnInit() {

    this.exigClienteSubscription = this.ventaComponentesService.exigeCliente$
      .subscribe(res => {
        this.requiereCliente = res;
        this.checkValid();
      });

    this.form = this.formBuilder.group({
      nrodoc: [''],
      razonsocial: ['', Validators.required],
      direccion: [''],
    });

  }

  ngOnDestroy(): void {
    this.exigClienteSubscription.unsubscribe();
  }

  _getObject($event: ProveedorclienteModel) {
    console.log($event);
    this.proveedorCliente = $event;
    const hayData = this.proveedorCliente ? true : false;

    if (hayData) {
      this.form.controls['nrodoc'].patchValue(this.proveedorCliente.nrodocumento);
      this.form.controls['razonsocial'].patchValue(this.proveedorCliente.razonsocial);
      this.form.controls['direccion'].patchValue( this.proveedorCliente.proveedorclientedireccions ? this.proveedorCliente.proveedorclientedireccions[0].direccion : 'NO ASIGNADO' );
    } else {
      this.form.controls['razonsocial'].patchValue('');
      this.form.controls['direccion'].patchValue('');
    }

    this.setProveedorClienteRpt(hayData);
    console.log(this.form.value);
  }

  private setProveedorClienteRpt(hayData: boolean): void {
    // prepara respuesta
    let isPublicoGeneral = false;
    if (!hayData) {
      /// SI NO HAY DATA Y EK
      if ( this.form.controls['nrodoc'].value.length === 0) {
        isPublicoGeneral = true;
        this.form.controls['nrodoc'].patchValue('');
        this.form.controls['razonsocial'].patchValue('PUBLICO EN GENERAL');
        this.form.controls['direccion'].patchValue('');
      }
    }

    // evalua si requiere cliente
    if (this.requiereCliente && isPublicoGeneral) {
      this.form.controls['razonsocial'].patchValue('');
      this.form.controls['direccion'].patchValue('');
    }

    this.checkValid();
  }

  private checkValid(): void {
    const valid = !this.requiereCliente ? true : this.form.valid;
    this.ventaComponentesService.setCheckValid('cliente', valid);
  }

}
