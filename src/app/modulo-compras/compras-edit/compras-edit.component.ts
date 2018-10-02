import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../shared/config.service';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';

@Component({
  selector: 'app-compras-edit',
  templateUrl: './compras-edit.component.html',
  styleUrls: ['./compras-edit.component.scss']
})
export class ComprasEditComponent implements OnInit {

  public compraForm: any;


  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService,
    private crudHttpClientServiceShared:CrudHttpClientServiceShared

  ) { }

  ngOnInit() {
  }


  buildForm() {


    this.compraForm = this.formBuilder.group({
      idcom001: ['0'],
      fechaEmision: [''],

      proveedorcliente: ['', Validators.required],
      tipodocumento: [''],
      documentoSerie : [''],
      documentoNumero : [''],
      fechaVencimiento:[''],
      almacen: ['', Validators.required],
      importeIsc: [''],
      importeBruto:[''],
      importeIgvPorcentaje:[''],
      importeIgv:[''],
      importeCompra:[''],
      moneda:[''],
      tipocambio:[''],
      importePagos:[''],
      modalidadCompraVenta:[''],
      flagGeneraFromNotaIngreso:[''],

      fechaRegistroSystema:[''],
      idUsuarioCrea:[''],

      fechaRegistroSystemaModifica:[''],
      idUsuarioModifica:[''],

      com002s:['']

    });

  }  

}
