

import { RequerimientoVolumen001Model } from "../requerimiento-volumen-001/requerimiento-volumen-001-model";
import { PuntoPartidaModel } from "../parametros/punto-partida/punto-partida-model";
import { PuntoLlegadaModel } from "../parametros/punto-llegada/punto-llegada-model";
import { VehiculoModel } from "../parametros/vehiculo/vehiculo-model";
import { ChoferModel } from "../parametros/chofer/chofer-model";
import { TransportistaModel } from "../parametros/transportista/transportista-model";
import { ProveedorclienteModel } from "../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model";


export class GuiaRemisionModel {

    constructor(
        public idGuiaRemision001:number=0,
        public serie:number=null,
        public numero:number=null,
        public numeroFisico:string=null,
        public fechaEmision:string=null,
        public proveedorcliente:ProveedorclienteModel =null,
        public puntoPartida:PuntoPartidaModel=null,
        public puntoLlegada:PuntoLlegadaModel=null,
        public requerimientoVolumen001:RequerimientoVolumen001Model=null,
        public vehiculo:VehiculoModel=null,
        public chofer:ChoferModel=null,
        public transportista:TransportistaModel,
        public estado:string,
        public sumaPesoTotal:number,
        public ordenPorItem:number

    ){

    }
}
