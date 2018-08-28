import { Injectable } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';
import { UsuarioModel } from '../usuario/usuario-model';
import { PerfilService } from '../perfil/perfil.service';
import { PerfilDetalleModel } from '../perfil/perfil-detalle-model';

@Injectable({
  providedIn: 'root',
  
})
export class MenuAppService {

  usuario:UsuarioModel;
  perfilDetallesModel:PerfilDetalleModel[];
  perfilDetalleChildrenModel:PerfilDetalleModel[];
  public menuAll;
  constructor(private menuService:MenuService, private perfilService:PerfilService) {
    this.menuAll = this.menuService.getAll();
   }

   getPerfilDetalle(){
     
     let login = localStorage.getItem("currentUserName");
     this.perfilService.getPerfilDetalleByIdLogin(login)
      .subscribe(
        res=> {
          this.perfilDetallesModel = res;
          
          this.addValidarAcceso();
        }
      )
   }

   

  addValidarAcceso(){
    this.menuService.resetMenuUsuario();
    
    
    this.perfilDetallesModel.forEach(element => {
      let idmenu:string =  element['idmenu'] ;
      idmenu = idmenu;

      let object = this.buscarInMenuAllPadres(idmenu)
      if(object.rtn = true){
        this.addMenu( object );
      }



    });


  }    

  buscarInMenuAllPadres(idmenu:string){
      //buscamos si existe en menuAll

      let rtn = {"rtn":false,element:null,children:null};
      if(idmenu.trim().length != 2){
        return rtn;
      }

      for (let index = 0; index < this.menuAll.length; index++) {
        const element = this.menuAll[index];
        let idmenuUusario = element['idmenu'];

        if(idmenuUusario === idmenu){
          //si tiene acceso, add menu
          rtn.rtn = true
          rtn.element = element;

          //verificamos si tiene childrens
          if(element.type == "sub"){
            rtn.children = this.buscarChildren(idmenu);
          }
          break; 
          
        }        
      }


      return rtn;
  }

  buscarChildren(idmenuPadre:string){
    let itemsChildren=[];
    //debugger;
    // filtramos solo los que tienen 4 digitos y como padre sea el parametro idemnuPadre;
    this.perfilDetallesModel.forEach(element => {
      let idmenu = element['idmenu'];

      if(idmenu.substring(0,2) == idmenuPadre && idmenu.length == 4){

        for (let index = 0; index < this.menuAll.length; index++) {
          const elementMenu = this.menuAll[index];
  
          if(elementMenu.idmenu.substring(0,2) === idmenuPadre){
            //Obtenemos el children
            let children = [];

            children = elementMenu['children'];

            children.forEach( item => {
              if(item.idmenu == idmenu){
                itemsChildren.push(item);
              }
            })
            
          }        
        }        

      }

    })

    return itemsChildren;


  }

  addMenu(menuAdd:any){
    
    if(menuAdd.element  == null){
      return ;
    }
    
    let menuSys = {
      state: menuAdd.element.state,// 'menu',
      name: menuAdd.element.name, //'MENU',
      type: menuAdd.element.type, //'sub',
      icon: menuAdd.element.icon, //'trending_flat',

      // children: [
      //   {state: 'menu', name: 'MENU'},
      //   {state: 'timeline', name: 'MENU'}
      // ]
    } 
    
    let children = {};
    if(menuAdd.element.type == "sub"){
      
      let array=[];

      menuAdd.children.forEach(element => {
        let children = {};
        children["state"]=element.state;
        children["name"]=element.name ;
        array.push(children);

      });

      menuSys["children"] = array;
    }
  
    this.menuService.addMenuUsuario(menuSys);    
  }
}
