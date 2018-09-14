import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoModel } from '../../modulo-cuenta-rr-hh/empleado/empleado-model';

@Component({
  selector: 'app-control-find-empleado',
  templateUrl: './control-find-empleado.component.html',
  styles: []
})
export class ControlFindEmpleadoComponent implements OnInit {

  dataForm: any;
  myControl: FormControl
  empleado: EmpleadoModel;
  idfilial: string = "";
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.dataForm = this.formBuilder.group({
      anno: ['1', Validators.required],
      empleado: ['', Validators.required]
    })
  }

  _getObject(e: any) {
    this.empleado = e;
    console.log("Informacion desde el componente :" + JSON.stringify(e));
    console.log('formulario:', this.dataForm.value);
  }

}
