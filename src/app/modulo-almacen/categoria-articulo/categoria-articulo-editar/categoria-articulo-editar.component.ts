import { Component, OnInit } from '@angular/core';
import { CategoriaArticuloModel } from '../categoria-articulo-model';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Route, Router } from '@angular/router';

import swal from 'sweetalert2';
import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';


@Component({
  selector: 'app-categoria-articulo-editar',
  templateUrl: './categoria-articulo-editar.component.html',
  styleUrls: ['./categoria-articulo-editar.component.css'],
  providers : [CrudHttpClientServiceShared]
 
  
})
export class CategoriaArticuloEditarComponent implements OnInit {
  flagRefreshReturn: boolean = false;
  msgPopup: any[];
  categoriaForm: any;
  id: number;
  sub: any;

  public categoriaArticuloModel: CategoriaArticuloModel = new CategoriaArticuloModel();

  constructor(
    private formBuilder: FormBuilder, 
    private crudHttpClientServiceShared:CrudHttpClientServiceShared,
    private route: ActivatedRoute) {

       this.sub = this.route.params.subscribe(
        params => {
          this.id = +params['id'];
        }
      ); 

  }

  ngOnInit() {
    this.buildForm();
    if(this.id != 0)
    this.edit()
  }

 

  buildForm() {
    this.categoriaForm = this.formBuilder.group({
      idcategoria: [this.categoriaArticuloModel.idcategoria || 0, Validators.required],
      dsccategoria: [this.categoriaArticuloModel.dsccategoria, Validators.required]
   
    })

  }

  edit(){

    this.crudHttpClientServiceShared.edit(this.id,"categoria","edit").subscribe(
      res => {
        this.categoriaArticuloModel = new CategoriaArticuloModel(res.idcategoria,res.dsccategoria );
        this.buildForm();
        
      },
      error=>console.log(error),
      ()=>{
        console.log(this.categoriaArticuloModel);
      }
    )


  }


  create(){
    this.crudHttpClientServiceShared.create(this.categoriaArticuloModel,"categoria","create").subscribe(

      res=>{
        this.categoriaArticuloModel = new CategoriaArticuloModel(res.idcategoria,res.dsccategoria );
        this.buildForm();
        this.flagRefreshReturn = true;

        //para recuperar desde el control que fue llamado        
        localStorage.setItem('categoria', JSON.stringify(this.categoriaArticuloModel));
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
    this.crudHttpClientServiceShared.update(this.categoriaArticuloModel,"categoria","update").subscribe(

     
      res=>{
        this.categoriaArticuloModel = new CategoriaArticuloModel(res.idcategoria,res.dsccategoria );
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
