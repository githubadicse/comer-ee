import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SessionService } from '../session.service';
import { MenuService } from '../../core/menu/menu.service';
import { ConfigService } from '../../shared/config.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers : [SessionService, ConfigService]
})
export class SigninComponent implements OnInit {

  public model = { 'username': '', 'password': '' };
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private loginService: SessionService, private configService:ConfigService) {}

  
  ngOnInit() {
    localStorage.clear();
    this.form = this.fb.group ( {
      uname: [null , Validators.compose ( [ Validators.required ] )] , password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {

    let request;
   
    this.model.username = this.form.controls.uname.value;
    this.model.password = this.form.controls.password.value;

    this.loginService.sendCredentials(this.model)
    .subscribe(
    res => {

       request = res;
       let x = JSON.stringify(res)
       let y = JSON.parse(x);


       if (y.token) {
         localStorage.setItem("token", y.token );
         let idusuario = this.configService.getIdUsuarioToken();
         let idfilial = this.configService.getIdFilialToken();
         let numeroEntrega = this.configService.getNumeroEntrega();
         let annoQaliwarma = this.configService.getAnnoQaliwarma();

         localStorage.setItem("currentUserName", y.user.username);
          console.log("usario que devuelve token",y.user);
         localStorage.setItem("idusuario", idusuario);
         localStorage.setItem("anno",annoQaliwarma);
         localStorage.setItem("numeroEntrega",numeroEntrega);
         localStorage.setItem("filial",idfilial)
        
         this.router.navigate ( [ '/session/confirmarpass' ] );

       } else {
         localStorage.clear();
         
       }
    }
    )
  }
}