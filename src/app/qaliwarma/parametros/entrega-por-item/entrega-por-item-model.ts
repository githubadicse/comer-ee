
import { PuntoPartidaModel } from "../punto-partida/punto-partida-model";
import { VehiculoModel } from "../vehiculo/vehiculo-model";
import { ChoferModel } from "../chofer/chofer-model";
import { TransportistaModel } from "../transportista/transportista-model";
import { ItemEntregaModel } from "../../item-entrega/item-entrega-model";
import { NumeroEntregaModel } from "../../numero-entrega/numero-entrega-model";
import { ProveedorclienteModel } from "../../../modulo-sistema-config/tablas/proveedorcliente/proveedorcliente-model";



export class EntregaPorItemModel {

    constructor(
        public idEntregaPorItem:string = null,
        public itemEntrega:ItemEntregaModel=null,
        public numeroEntrega:NumeroEntregaModel=null,
        public cerrado:boolean=null,
        public inicioAtencion:string=null,
        public finAtencion:string=null,
        public proveedorcliente:ProveedorclienteModel=null,
        public puntoPartida:PuntoPartidaModel = null,
        public vehiculo:VehiculoModel=null,
        public chofer:ChoferModel = null,
        public transportista:TransportistaModel = new TransportistaModel()
    ){

    }
}
