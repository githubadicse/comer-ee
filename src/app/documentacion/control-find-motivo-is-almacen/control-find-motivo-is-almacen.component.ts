import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-find-motivo-is-almacen',
  templateUrl: './control-find-motivo-is-almacen.component.html',
  styles: []
})
export class ControlFindMotivoIsAlmacenComponent implements OnInit {

  dataForm: any;
  myControl: FormControl
  mediopago: any;

  motivo: string = 'i'; // ingreso
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.dataForm = this.formBuilder.group({
      anno: ['1', Validators.required],
      motivo: ['', Validators.required]
    })
  }
  
  _getObject(e: any) {
    this.mediopago = e;
    console.log("Informacion desde el componente :" + JSON.stringify(e));
    console.log('formulario:', this.dataForm.value);
  }  

}
