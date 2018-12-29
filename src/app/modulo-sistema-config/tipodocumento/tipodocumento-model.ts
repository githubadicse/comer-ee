import { NumeradorModel } from "./numerador.model";

export class TipodocumentoModel {

    constructor(
        public idTipoDocumento:number=null,
        public dscTipoDocumento:string=null,
        public codigoSunat:string=null,
        public exigecliente: boolean = null,
        public numeradors: NumeradorModel[] = null
    ){

    }
}