// devuelve los datos filtrados del conttrol matAutocomplete
import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCtrlAutocomplete]'
})
export class CtrlAutocompleteDirective {
  @Input('data') data: any [];
  @Input('etiqueta') etiqueta: string = 'descripcion';
  
  @Output('DatosFiltrados') DatosFiltrados: EventEmitter<any> = new EventEmitter();

  DataFiltrada: any [];  

  constructor() {   
  }

  @HostListener('keyup', ["$event.target.value"]) ngOnChanges(value: any) {  
    if (this.data === undefined || this.etiqueta === undefined) {return}        
    let val = <string>value.toString();
    val = val.toLowerCase();
    
    this.DataFiltrada = this.data.filter((x: any) => x[this.etiqueta].toLowerCase().indexOf(val) !== -1).slice(0, 5);
    this.DatosFiltrados.emit(this.DataFiltrada);
  }
}


