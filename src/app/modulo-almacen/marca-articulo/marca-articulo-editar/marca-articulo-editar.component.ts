import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { MarcaArticuloModel } from '../marca-articulo-model';
import { MarcaArticuloService } from '../marca-articulo.service';

import { isUndefined } from 'util';
import swal from 'sweetalert2';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';

@Component({
  selector: 'app-marca-articulo-editar',
  templateUrl: './marca-articulo-editar.component.html',
  styleUrls: ['./marca-articulo-editar.component.css'],
  providers:[MarcaArticuloService]
})
export class MarcaArticuloEditarComponent implements OnInit {
  marcaForm: any;
  flagRefreshReturn: boolean = false;
  msgPopup: any[];
  id: any;
  sub: any;  

  public marcaArticuloModel:MarcaArticuloModel= new MarcaArticuloModel();

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudHttpClientServiceShared: CrudHttpClientServiceShared
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
    this.marcaForm = this.formBuilder.group({
      idMarca: [this.marcaArticuloModel.idmarca, Validators.required],
      dscMarca: [this.marcaArticuloModel.dscmarca, Validators.required]
   
    })

  }

  edit(){

    this.crudHttpClientServiceShared.edit(this.id,"marca","edit").subscribe(
      res => {
        this.marcaArticuloModel = new MarcaArticuloModel(res.idmarca ,res.dscmarca );
        this.buildForm();
        
      },
      error=>console.log(error),
      ()=>{
        console.log(this.marcaArticuloModel);
      }
    )
  }


  create(){
    this.crudHttpClientServiceShared.create(this.marcaArticuloModel,"marca","create").subscribe(

      res=>{
        this.marcaArticuloModel = new MarcaArticuloModel(res.idmarca ,res.dscmarca );
        this.buildForm();
        this.flagRefreshReturn = true;

        //para recuperar desde el control que fue llamado        
        localStorage.setItem('marca', JSON.stringify(this.marcaArticuloModel));
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
    debugger;
    this.crudHttpClientServiceShared.update(this.marcaArticuloModel,"marca","update").subscribe(

     
      res=>{
        this.marcaArticuloModel = new MarcaArticuloModel(res.idmarca ,res.dscmarca);
        this.buildForm();
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
