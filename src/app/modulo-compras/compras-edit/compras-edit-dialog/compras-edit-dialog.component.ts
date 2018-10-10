import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductoModel } from '../../../modulo-sistema-config/tablas/producto/model/producto.model';
import { CompraDetalleModel } from '../../compra-detalle-model';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-compras-edit-dialog',
  templateUrl: './compras-edit-dialog.component.html',
  styles: []
})
export class ComprasEditDialogComponent implements OnInit {

  form: FormGroup;  
  producto: ProductoModel;

  public cantidad: string = '';
  public lote: string = '';  
  public importeBruto:number =0;
  public importeIsc:number=0;
  public importeDescuento:number=0;
  public importeValorCompra:number=0;
  public importeIgv:number=0;
  public importePorcentajeIgv:number=0;
  public importeFlete:number=0;
  public importeUnitario:number=0;
  public importeTotalCostoUnitario: number =0;
  public importeCompra:number=0;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CompraDetalleModel>,
        @Inject(MAT_DIALOG_DATA) data
  ) { 

    this.producto = data.producto;    
    this.cantidad = data.cantidad;    
    this.importeBruto = data.importeBruto;
    this.importeIsc = data.importeIsc;
    this.importeDescuento = data.importeDescuento;
    this.importeValorCompra = data.importeValorCompra;
    this.importeIgv = data.importeIgv;
    this.importePorcentajeIgv = data.importePorcentajeIgv;
    this.importeFlete = data.importeFlete;
    this.importeUnitario = data.importeUnitario;
    this.importeTotalCostoUnitario = data.importeTotalCostoUnitario;
    this.importeCompra = data.importeCompra;
    

  }  

  ngOnInit() {
    this.preprarForm();
    
    this.form.valueChanges
    .subscribe(x => this.calcular(x))

  }

  preprarForm() {
    this.form = this.formBuilder.group({
      producto: this.producto,
      cantidad: [this.cantidad,  [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      importeBruto : [this.importeBruto,Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
      importeIsc : [this.importeIsc, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
      importeDescuento : [this.importeDescuento, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
      importeValorCompra : [this.importeValorCompra, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
      importeIgv : [this.importeIgv, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
      importePorcentajeIgv : [this.importePorcentajeIgv, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
      importeFlete : [this.importeFlete, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
      importeUnitario : [this.importeUnitario, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
      importeTotalCostoUnitario : [this.importeTotalCostoUnitario, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
      importeCompra : [this.importeCompra, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')],
    });
  }

  calcular(x) {
      const valorCompra = (x.importeIsc + x.importeBruto) - x.importeDescuento; 
      x.importeValorCompra = valorCompra;
      this.importeValorCompra = valorCompra;
  }

  save() {
    if (!this.form.valid) return;
    
    // retorna un CompraDetalleModel    
    let _data: CompraDetalleModel = new CompraDetalleModel();    
    const dataForm = this.form.value;
    Object.keys(dataForm).forEach(name => {
      if (dataForm[name]) {
        _data[name] = dataForm[name];
      }
    });

    this.dialogRef.close(_data);
  }

  close() {
      this.dialogRef.close();
  }

  _getObjectFecha(event) {
    this.form.value.fechavencimiento = event;
  }

}
