import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoModel } from '../../../../modulo-sistema-config/tablas/producto/model/producto.model';

@Component({
  selector: 'app-almacen-ingreso-edicion-dialog',
  templateUrl: './almacen-ingreso-edicion-dialog.component.html',
  styleUrls: ['./almacen-ingreso-edicion-dialog.component.scss']
})
export class AlmacenIngresoEdicionDialogComponent implements OnInit {  
  
  form: FormGroup;  
  producto: ProductoModel;
  // fecha: string;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AlmacenIngresoEdicionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data
  ) {

    this.producto = data.producto;
   }

  ngOnInit() {

    this.form = this.formBuilder.group({
      producto: this.producto,
      cantidad: ['', Validators.required],
      lote: ['', Validators.required],
      fechavencimiento: ['']
    });
  }

  save() {    
    this.dialogRef.close(this.form.value);    
  }

  close() {
      this.dialogRef.close();
  }

  _getObjectFecha(event) {
    this.form.value.fechavencimiento = event;
  }
}
