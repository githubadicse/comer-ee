import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ad-mainproducto',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public showLista: boolean = true;
  public showEdicion: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
