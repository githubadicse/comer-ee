import { Component, OnInit } from '@angular/core';
import { MenuService } from '../core/menu/menu.service';
import { MenuAppService } from '../modulo-sistema-config/menu/menu-app.service';
import { PerfilService } from '../modulo-sistema-config/perfil/perfil.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers : [MenuService,MenuAppService,PerfilService]
})


export class DashboardComponent implements OnInit{
  // data: any;
  filesToUpload: any[] = [];
  constructor( 
    private menuAppService:MenuAppService
    ){
  }

  ngOnInit() {
    this.menuAppService.getPerfilDetalle();
  }

}
