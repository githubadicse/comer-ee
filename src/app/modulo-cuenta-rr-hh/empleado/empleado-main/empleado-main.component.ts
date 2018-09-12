import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ad-empleado-main',
  templateUrl: './empleado-main.component.html',
  styleUrls: ['./empleado-main.component.css']
})
export class EmpleadoMainComponent implements OnInit {

  flagVisible = true;
  accion:string;
  idElement:number;
  constructor() { }

  ngOnInit() {
  }

  _accion(e){

    this.flagVisible = e.isVisible;
    this.accion = e.accion;
    this.idElement = e.element==undefined?0:e.element.idempleado;
  }

}
