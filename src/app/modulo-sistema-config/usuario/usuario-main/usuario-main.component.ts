import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-main',
  templateUrl: './usuario-main.component.html',
  styleUrls: ['./usuario-main.component.css']
})
export class UsuarioMainComponent implements OnInit {

  public titulo:string = "Usuarios"
  constructor() { }
  ngOnInit() {
  }

}