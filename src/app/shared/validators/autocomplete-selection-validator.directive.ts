import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[AutocompleteSelectionValidator][formControlName], [AutocompleteSelectionValidator][formControl], [AutocompleteSelectionValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AutocompleteSelectionValidatorDirective), multi: true }
  ]
})
export class AutocompleteSelectionValidatorDirective implements Validator{  
  constructor() { }

  validate(c: AbstractControl): { [key: string]: any } {    
    if (!c.pristine && typeof c.value === "string") { return { incorrect: {} }; } // cuando carga el formulario con un valor asignado == string    
    return null;
  }

}
