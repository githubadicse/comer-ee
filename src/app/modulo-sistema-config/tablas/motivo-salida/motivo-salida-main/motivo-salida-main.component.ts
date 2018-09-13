import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ad-motivo-salida-main',
  templateUrl: './motivo-salida-main.component.html',
  styleUrls: ['./motivo-salida-main.component.css']
})
export class MotivoSalidaMainComponent implements OnInit {


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
