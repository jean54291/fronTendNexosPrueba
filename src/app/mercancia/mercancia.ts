import { DatePipe } from "@angular/common";
import { Usuarios } from "../usuarios/usuarios";

export class Mercancia {
    idMercancia:number;
    nombre:string;
    cantidad:number;
    fecha_ingreso:Date;
    fecha_modificacion:Date;
    usuario_asignado:Usuarios;
    last_user:Usuarios;
}
