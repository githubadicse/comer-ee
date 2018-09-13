import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductoModel } from '../../modulo-sistema-config/tablas/producto/model/producto.model';


@Component({
  selector: 'app-control-find-codigo-barra',
  templateUrl: './control-find-codigo-barra.component.html',  
})
export class ControlFindCodigoBarraComponent implements OnInit {

  dataForm: any;
  myControl: FormControl
  producto: ProductoModel;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.dataForm = this.formBuilder.group({
      anno: ['1', Validators.required],      
      codigobarra: ['', Validators.required]
    })
  } 

  _getObject(e: ProductoModel) {        
    this.producto = e;
    console.log("Informacion desde el componente :" + JSON.stringify(e));
    console.log('formulario:', this.dataForm.value);
  }

}
