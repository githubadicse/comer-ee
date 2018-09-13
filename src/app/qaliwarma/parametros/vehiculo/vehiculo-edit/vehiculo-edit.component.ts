import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2'
import { isUndefined } from 'util';
import { VehiculoModel } from '../vehiculo-model';
import { CrudHttpClientServiceShared } from '../../../../shared/servicio/crudHttpClient.service.shared';
import { ProveedorclienteService } from '../../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente.service';



@Component({
  selector: 'app-vehiculo-edit',
  templateUrl: './vehiculo-edit.component.html',
  styleUrls: ['./vehiculo-edit.component.css'],
  providers: [CrudHttpClientServiceShared,ProveedorclienteService]
})
export class VehiculoEditComponent implements OnInit {

  vehiculoForm: any;
  flagRefreshReturn: boolean = false;
  id: any;
  sub: any;

  public vehiculoModel:VehiculoModel= new VehiculoModel();

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudHttpClientServiceShared: CrudHttpClientServiceShared,
    private proveedorclienteService:ProveedorclienteService
  ) {
    this.sub = this.activateRoute.params.subscribe(
      params => {
        this.id = +params['id'];
        if (isUndefined(params['flagRefresh'])) {
          return;
        }
      }
    );

  }

  ngOnInit() {
    this.buildForm();
   

    if(this.id != 0)
    this.edit();
  }

  buildForm() {
    this.vehiculoForm = this.formBuilder.group({
      idVehiculo: [this.vehiculoModel.idVehiculo, Validators.required],
      numeroPlaca: [this.vehiculoModel.numeroPlaca, Validators.required],
      marcaVehiculo: [this.vehiculoModel.marcaVehiculo , Validators.required]
   
    })

  }

  edit(){


    this.crudHttpClientServiceShared.edit(this.id,"vehiculo","edit").subscribe(
      res => {
        this.vehiculoModel = new VehiculoModel(res.idVehiculo,res.numeroPlaca,res.marcaVehiculo);
        this.vehiculoForm.setValue(this.vehiculoModel)
        
      },
      error=>console.log(error),
      ()=>{
        console.log(this.vehiculoModel);
      }
    )


  }


  create(){
    let data =  JSON.stringify(this.vehiculoForm.value);
    this.crudHttpClientServiceShared.create(data,"vehiculo","create").subscribe(

      res=>{
        this.vehiculoModel = new VehiculoModel(res.idVehiculo,res.numeroPlaca,res.marcaVehiculo);
        this.vehiculoForm.setValue(this.vehiculoModel)
        this.flagRefreshReturn = true;
      },
      error=>console.log(error),
      ()=>{
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
    let data =  JSON.stringify(this.vehiculoForm.value);
    this.crudHttpClientServiceShared.update(data,"vehiculo","update").subscribe(

     
      res=>{
        this.vehiculoModel = new VehiculoModel(res.idVehiculo,res.numeroPlaca,res.marcaVehiculo);
        this.vehiculoForm.setValue(this.vehiculoModel);
        this.flagRefreshReturn = true;
      },
      error=>console.log(error),
      ()=>{
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

}
