import { UsuarioModel } from "./usuario-model";
import { EmpleadoModel } from "../../modulo-cuenta-rr-hh/empleado/empleado-model";
export class UsuarioEmpleadoModel {
    constructor(
        public idusuarioempleado:any=null,
        public usuario:UsuarioModel=null,
        public empleado:EmpleadoModel=null
    ){
    }
}