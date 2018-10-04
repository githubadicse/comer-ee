import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { CrudHttpClientServiceShared } from '../../shared/servicio/crudHttpClient.service.shared';
import { UsuarioModel } from '../../modulo-sistema-config/usuario/usuario-model';
import * as jwt_decode from "jwt-decode";
import { ConfigService } from '../../shared/config.service';
import swal from 'sweetalert2';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-confirmarpass',
  templateUrl: './confirmarpass.component.html',
  styleUrls: ['./confirmarpass.component.scss']
})
export class ConfirmarpassComponent implements OnInit {
  public form: FormGroup;  
  id: any;

  public usuarioModel:UsuarioModel= new UsuarioModel();  
  constructor( private configService:ConfigService, private fb: FormBuilder, private formBuilder: FormBuilder,private router: Router,  private crudHttpClientServiceShared: CrudHttpClientServiceShared,) { }

  ngOnInit() {    
    this.edit();
    
    this.form = this.fb.group( {      
      password: password,
      confirmPassword: confirmPassword
    } );
  }


  edit(){
    let idusuario = this.configService.getIdUsuarioToken();
    this.crudHttpClientServiceShared.edit(idusuario,"usuario","edit").subscribe(
      res => {
        console.log("que trae eto",idusuario);
        // this.usuarioModel = new UsuarioModel(res.idusuario,res.nomusuario,res.dni,res.login,res.clave,res.activo,res.perfil,res.filial);
        this.usuarioModel = <UsuarioModel>res;
      },
      error=>console.log(error),
      ()=>{
        console.log(this.usuarioModel);
      }
    )
  }

  update(){
    // let data =  JSON.stringify(this.usuarioForm.value);    
    this.usuarioModel.cntCambioClave = 1;
    this.usuarioModel.clave = this.form.value.password;    

    this.crudHttpClientServiceShared.update(this.usuarioModel,"usuario","update").subscribe(
      res=>{
        this.router.navigate(['/session/signin']);
      },
      error=>console.log(error),
      ()=>{        

      }
    )
  }

}