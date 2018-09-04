import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-medio-pago',
  templateUrl: './control-medio-pago.component.html',
  styles: []
})
export class ControlMedioPagoComponent implements OnInit {

  dataForm: any;
  myControl: FormControl
  mediopago: any;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.dataForm = this.formBuilder.group({
      anno: ['1', Validators.required],
      mediopago: ['', Validators.required]
    })
  }
  
  _getObject(e: any) {
    this.mediopago = e;
    console.log("Informacion desde el componente :" + JSON.stringify(e));
    console.log('formulario:', this.dataForm.value);
  }

}
