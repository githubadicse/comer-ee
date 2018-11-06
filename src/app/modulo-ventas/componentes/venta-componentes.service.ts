import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentaComponentesService {

  private exigeClienteSource = new BehaviorSubject<boolean>(false);
  public exigeCliente$ = this.exigeClienteSource.asObservable();

  private checkValidAllSource = new BehaviorSubject<boolean>(false);
  public checkValidAll$ = this.checkValidAllSource.asObservable();

  private precioTotalPagarSource = new BehaviorSubject<number>(0);
  public precioTotalPagar$ = this.precioTotalPagarSource.asObservable();

  private estado = false;
  private listCheckValid: any = [];
  private rptCheckValid = false;
  private importePagar = 0;

  constructor() {
    this.exigeClienteSource.next(this.estado);
    this.checkValidAllSource.next(this.rptCheckValid);
    this.precioTotalPagarSource.next(this.importePagar);
   }

   public setImporPagar(val: number): void {
     this.importePagar = val;
     this.precioTotalPagarSource.next(this.importePagar);
   }

  public getImporPagar(val: number): number {
    return this.importePagar;
  }

  public setExigeCliente( val: boolean ): void {
    this.estado = val;
    this.exigeClienteSource.next(val);
  }

  public  getExigeCliente(): boolean {
    return this.exigeClienteSource.value;
  }

  public setCheckValid(key: string, estado: boolean): void {
    this.listCheckValid[key] = estado;
    this.verificrCheckValids();
  }

  private verificrCheckValids(): void {
    let chekFilter = true;
    Object.keys(this.listCheckValid).map( key => {
      if (!this.listCheckValid[key]) { chekFilter = false; return; }
    });

    this.checkValidAllSource.next(chekFilter);
  }
}
