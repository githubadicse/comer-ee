import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProveedorclienteModel } from '../../modulo-almacen/proveedorcliente/proveedorcliente-model';

@Component({
  selector: 'app-control-proveedor-cliente',
  templateUrl: './control-proveedor-cliente.component.html',  
})
export class ControlProveedorClienteComponent implements OnInit {

  dataForm: any;
  myControl: FormControl  
  proveedor_cliente: ProveedorclienteModel;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.dataForm = this.formBuilder.group({
      anno: ['1', Validators.required],
      dni: ['', Validators.required],
      ruc: ['', Validators.required]
    })
  }

  _getObject(e: ProveedorclienteModel) {
    this.proveedor_cliente = e;
    console.log("Informacion desde el componente :" + JSON.stringify(e));
    console.log('formulario:', this.dataForm.value);
  }

}
