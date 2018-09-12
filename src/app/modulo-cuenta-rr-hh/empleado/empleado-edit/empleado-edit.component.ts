import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { EmpleadoModel } from '../empleado-model';
import { debug } from 'util';
import { SharedService } from '../../../shared/servicio/shared.service';
import swal from 'sweetalert2';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';
import { MomentDateAdapter } from '../../../shared/validators/MomentDateAdapter';
import { UsuarioEmpleadoModel } from '../../../modulo-sistema-config/usuario/usuario-empleado-model';


@Component({
  selector: 'ad-empleado-edit',
  templateUrl: './empleado-edit.component.html',
  styleUrls: ['./empleado-edit.component.css'],
  providers: [SharedService, CrudHttpClientServiceShared, MomentDateAdapter]
})
export class EmpleadoEditComponent implements OnInit {

  @Input() isVisible: boolean;
  @Input() accion: string;
  @Input() idElement: number;


  @Output() out_isVisible: EventEmitter<any> = new EventEmitter();

  id: number;
  sub: any;
  msgPopup: any[];
  flag = false;
  controlFechaIngreso: any;
  public empleadoModel: EmpleadoModel;

  public empleadoForm: any;

  color = 'accent';
  checked = false;
  disabled = false;

  constructor(private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private crudHttpClientServiceShared: CrudHttpClientServiceShared,
    private DateAdapter: MomentDateAdapter
  ) {


  }

  ngOnInit() {
    this.buildForm();
    //this.setModel(this.empleadoModel,this.empleadoForm);
    
    if (this.idElement != 0) {
      this.getEdit();
    } else {



      this.empleadoForm.get('activo').setValue(false);
      this.flag = true;
    }
    //this.getEdit();
  }


  buildForm() {
    this.empleadoForm = this.formBuilder.group({
      idempleado: ['0'],
      nomempleado: ['', Validators.required],
      dni: ['', Validators.required],
      fechaingreso: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      email: [''],
      usuarioempleados: [''],
      activo: [false],
      fechaRegistroSystema: [''],
      fechaRegistroSystemaModifica: [''],
      idusuario: [''],
      idusuarioModifica: ['']

    })
  }


  getEdit() {
    this.sharedService.findById(this.idElement, "empleado", "edit")
      .subscribe(
        res => {
          let usuarioempleados = [];
          let empleado = new EmpleadoModel(res.idempleado, res.nomempleado, res.dni, res.fechaingreso, res.fechanacimiento, res.direccion, res.telefono, res.email, 
            res.usuarioempleados==undefined? usuarioempleados:res.usuarioempleados, 
            res.activo, 
            res.fechaRegistroSystema, res.fechaRegistroSystemaModifica, res.idusuario, res.idusuarioModifica);

          this.empleadoForm.setValue(empleado);
          this.flag = true;

        });

  }




  create() {
    let usuarioempleados = [];

    let fechaingreso = this.DateAdapter.format(this.empleadoForm.controls['fechaingreso'].value, 'DD/MM/YYYY');
    let fechanacimiento = this.DateAdapter.format(this.empleadoForm.controls['fechanacimiento'].value, 'DD/MM/YYYY');

    this.empleadoForm.controls['fechaingreso'].setValue(fechaingreso);
    this.empleadoForm.controls['fechanacimiento'].setValue(fechanacimiento);
    this.empleadoForm.controls['usuarioempleados'].setValue(usuarioempleados);

    let data = JSON.stringify(this.empleadoForm.value);
    this.crudHttpClientServiceShared.create(data, "empleado", "create").subscribe(

      res => {

      },
      error => console.log(error),
      () => {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Registro Creado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )


  }

  update(){
    let fechaingreso = this.DateAdapter.format(this.empleadoForm.controls['fechaingreso'].value, 'DD/MM/YYYY');
    let fechanacimiento = this.DateAdapter.format(this.empleadoForm.controls['fechanacimiento'].value, 'DD/MM/YYYY');

    this.empleadoForm.controls['fechaingreso'].setValue(fechaingreso);
    this.empleadoForm.controls['fechanacimiento'].setValue(fechanacimiento);


    let data = JSON.stringify(this.empleadoForm.value);
    this.crudHttpClientServiceShared.update (data, "empleado", "update").subscribe(

      res => {

      },
      error => console.log(error),
      () => {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Registro Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )    
  }

  _out_isVisible() {

    this.out_isVisible.emit(!this.isVisible);
  }

}
