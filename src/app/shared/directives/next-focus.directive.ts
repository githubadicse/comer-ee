import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appNextFocus]'
})
export class NextFocusDirective {

  private el: ElementRef;
    @Input() onReturn: string;
    @Input() ContentFocus = '';
    constructor(private _el: ElementRef) {
        this.el = this._el;
    }

    @HostListener('keydown', ['$event']) onKeyDown(e: any) {

        if ((e.which === 13 || e.keyCode === 13)) {
            let index_activo = 0;
            let next_control_focus: any;

            const controles = document.querySelectorAll(this.ContentFocus + ' [appNextFocus]');
            const element_active = e.srcElement;
            e.preventDefault();

            Array.from(controles).forEach((element, index) => {
                if (element === element_active) { index_activo = index; return; }
            });

            next_control_focus = controles.item(index_activo + 1);
            if (next_control_focus) {
                next_control_focus.focus();
                return;
            } else {
                return;
            }
        }
    }

}
