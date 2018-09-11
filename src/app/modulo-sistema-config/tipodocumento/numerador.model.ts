import { TipodocumentoModel } from "./tipodocumento-model";

export class NumeradorModel {

    constructor(
        public idNumerador: number = null,
        public serie: number = null,
        public ultimoEmitido: number = null,
        public tipodocumento: TipodocumentoModel,
    ) {

    }
}