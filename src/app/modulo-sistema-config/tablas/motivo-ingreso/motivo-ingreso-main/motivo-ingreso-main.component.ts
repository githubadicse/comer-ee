import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ad-motivo-ingreso-main',
  templateUrl: './motivo-ingreso-main.component.html',
  styleUrls: ['./motivo-ingreso-main.component.css']
})
export class MotivoIngresoMainComponent implements OnInit {

  showEdicion: boolean;
  showLista: boolean;

  constructor() { }

  ngOnInit() {
  }

  onActivate() {
    console.log("Activate edicion");
    this.showLista = false;
    this.showEdicion = true;

  }

  onDeactivate() {
    console.log("Deactivate edicion");
    this.showLista = true;
    this.showEdicion = false;

  }


  onActivateLista() {
    console.log("Activate lista");
    this.showLista = true;
    this.showEdicion = false;

  }
  onDeactivateLista() {
    console.log("Deactivate Lista");
    this.showLista = false;
    this.showEdicion = true;

  }

}
