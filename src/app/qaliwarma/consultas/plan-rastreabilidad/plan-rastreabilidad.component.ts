import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PlanRastreabilidadService } from './plan-rastreabilidad.service';
import swal from 'sweetalert2';
import { AlmacenModel } from '../../../modulo-almacen/almacen/almacen-model';

@Component({
  selector: 'app-plan-rastreabilidad',
  templateUrl: './plan-rastreabilidad.component.html',
  styleUrls: ['./plan-rastreabilidad.component.scss'],
  providers : [PlanRastreabilidadService]
})
export class PlanRastreabilidadComponent implements OnInit {

  dataForm: any;
  blocked :boolean= false;
  public anno:number = 2018;
  public numeroEntrega:number = 1;
  public titulo = "PLAN DE RASTREABILIDAD"
  constructor(private formBuilder: FormBuilder,private planRastreabilidadService:PlanRastreabilidadService) { }
  myControl:FormControl
  ngOnInit() {
    this.numeroEntrega = parseInt( localStorage.getItem("numeroEntrega"));
    this.buildForm();

  }

  buildForm(){
    this.dataForm = this.formBuilder.group({
      anno: [this.anno, Validators.required],
      numeroEntrega: [this.numeroEntrega, Validators.required],
      almacen : ['',Validators.required]
   
    })
  }

  _getObject(e:AlmacenModel){
    console.log("Informacion desde el componente :" + JSON.stringify(e) );
  }

  generar(){
  
    this.blocked = true;
    let d = new Date();
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    let nombre = "RASTREABILIDAD-"+this.anno + "-" + this.numeroEntrega + "-" + d.getDate()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();
    this.planRastreabilidadService.generarReporte (this.anno,this.numeroEntrega).subscribe(
      res => {
       
        if (res.body.size == 0) {  
          console.log("Errorr")          
          return;
        }
     
        console.log(res)
        
        let mediaType = res.headers.get("Content-Type");
        console.log(mediaType)
        let blob = new Blob([res.body], { type: mediaType });
     
        var fileURL = URL.createObjectURL(blob);
        a.href = fileURL;
        a.download = nombre +".xlsx";
        a.click();
        window.URL.revokeObjectURL(fileURL);

   
      },
      err => { 
        this.blocked = false;
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Error servidor : ' + err
         
        })
       }
      ,
      () => { 
        this.blocked = false;
        swal("Bien!", "El Proceso finalizo correctamente!", "success")
       }
      );
    
  }


}
