import { FilialModel } from '../../filial/filial-model';
export class AlmacenModel {

    constructor(
        public idalmacen:any=0,
        public dscalmacen:string=null,
        public direccion:string=null,
        public filial: FilialModel = null
    ){

    }
}
