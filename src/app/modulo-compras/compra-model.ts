import { AlmacenModel } from "../modulo-sistema-config/tablas/almacen/almacen-model";
import { MonedaModel } from "../modulo-sistema-config/tablas/moneda/moneda-model";

export class CompraModel {

    constructor(
        public idcom001:number = 0,
        public idproveedorcliente:number = null,
        public fecha:string = null,
        public hora:string = null,
        public almacen:AlmacenModel = null,
        public moneda:MonedaModel = null,
        

    ){

    }
}
