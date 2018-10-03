import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoModel } from '../../../../modulo-sistema-config/tablas/producto/model/producto.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-almacen-salida-edicion-dialog',
  templateUrl: './almacen-salida-edicion-dialog.component.html',
  styles: []
})
export class AlmacenSalidaEdicionDialogComponent implements OnInit {

  form: FormGroup;  
  producto: ProductoModel;

  private cantidad: string = '';
  private lote: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AlmacenSalidaEdicionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.producto = data.producto;    
    this.cantidad = data.cantidad;
    this.lote = data.lote;
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      producto: this.producto,
      cantidad: [this.cantidad,  Validators.required],
      lote: [this.lote],      
    });
    
  }

  save() {    
    if (!this.form.valid) return;
    this.dialogRef.close(this.form.value);    
  }

  close() {
      this.dialogRef.close();
  }

}
