import { AlmacenModel } from "../../modulo-sistema-config/tablas/almacen/almacen-model";


export class PeriodoalmacenModel {

    constructor(
        public idperiodoalmacen:number=0,
        public mes:number=null,
        public anno:number=null,
        public estado:string=null,
        public iniciooperaciones:number=null,
        public almacen:AlmacenModel=null

    ){

    }
}
