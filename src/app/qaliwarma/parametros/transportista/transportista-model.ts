import { ProveedorclienteModel } from "../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model";


export class TransportistaModel {

    constructor(
        public idTransportista:number=null,
        public proveedorcliente:ProveedorclienteModel=null
    ){

    }
}
