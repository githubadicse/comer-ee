import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmpleadoService } from '../../modulo-cuenta-rr-hh/empleado/empleado.service';
import { FormControl } from '@angular/forms';
import { EmpleadoModel } from '../../modulo-cuenta-rr-hh/empleado/empleado-model';

@Component({
  selector: 'app-comp-find-empleado',
  templateUrl: './comp-find-empleado.component.html',
  styleUrls: ['./comp-find-empleado.component.scss'],
  providers: [ EmpleadoService ]
})
export class CompFindEmpleadoComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  // Pre asignar un idfilial
  // no es obligatorio, si su valor es '' , muestra todos los usarios de todas las filiales
  @Input()
  idFilial:number=1; 
  
  @Output()
  getObject: EventEmitter<EmpleadoModel> = new EventEmitter();  

  public listEmpleados: EmpleadoModel[] = [];

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit() {

    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadEmpleados(this.idFilial);
  }

  private loadEmpleados(idFilial): void {
    this.empleadoService.getByCondicionFilial(idFilial).
      subscribe( res => {
        // si no hay filtro filial (idfilial) utiliza el evento "getall" donde los datos vienen en "data"
        this.listEmpleados = res;
      }
      )
  }
  
  _onSelectionChange(a,b) {
    this.getObject.emit(a.value);
  }

  // comparEmpleado = (c1: any, c2: any):boolean => c1 && c2 ? c1.id === c2.id : c1 === c2;
  comparEmpleado(c1: EmpleadoModel, c2: EmpleadoModel): boolean {
    return c1 && c2 ? c1.idempleado === c2.idempleado : c1 === c2;
  }

}
