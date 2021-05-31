import { Component, OnInit, ViewChild } from '@angular/core';
import {Subject} from 'rxjs';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Mercancia } from './mercancia';
import { MercanciaService } from './mercancia.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuarios } from '../usuarios/usuarios';

@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrls: ['./mercancia.component.css']
})
export class MercanciaComponent implements OnInit {
  
  titulo:string="Lista de Mercancia";
  // mercancias:Mercancia[];
  usuarios:Usuarios[];
  status:string;
  usuariosfilter:Mercancia[];
  errorMessage:string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  dangerMessage = '';

  filtrosNombre:string;
  filtrosFecha:Date;

  selectUsuariofilter="";
  usuariosLogin:Usuarios = new Usuarios();
  usuariosFiltro:Usuarios;
  filters:Mercancia = new Mercancia();
  mercancias:Mercancia = new Mercancia();


  selectUsuario:"";
  selectUsuarios:"";

  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private mercanciaService:MercanciaService, private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getAll().subscribe(
      user=>this.usuarios=user
    );
    this._success.subscribe(message => this.successMessage = message);
    this._danger.subscribe(message => this.dangerMessage = message);
  }


  delete(merca:Mercancia,user:Usuarios):void{
    if(user.idUsuario){
      this.mercanciaService.delete(merca.idMercancia,user.idUsuario).subscribe({
        next:data=>{
          this._success.next("Se elimino el registro exitosamente");
          setTimeout(() => this.staticAlert.close(), 2000);
          this.mercanciaService.getAll().subscribe({
            next:response=>{
              this.cargarFiltros();
            },
            error: error_get=>{
              setTimeout(() => this.staticAlert.close(), 2000);
              this._danger.next(error_get['error'].descripcion);
            }
          });
        },
        error: error=>{
          setTimeout(() => this.staticAlert.close(), 2000);
          this._danger.next(error['error'].descripcion);
        } 
      });
    }else{
      setTimeout(() => this.staticAlert.close(), 2000);
      this._danger.next("Por favor Seleccionar Usuario login");
    }
    
  }


  getUsuarios():void{
    this.usuariosService.getAll().subscribe(
      users=>this.usuarios=users
    );
  }

  getUsuario(llave):void{
    let value = this.usuarios.find(x => x.idUsuario == llave);
    this.usuariosLogin={"idUsuario":llave,"nombre":value.nombre,"edad":null,"cargo":null,fecha_ingreso:null}
    
  }

  getUsuarioFiltro(llave):void{
    let value = this.usuarios.find(x => x.idUsuario == llave);
    this.usuariosFiltro={"idUsuario":llave,"nombre":value.nombre,"edad":null,"cargo":null,fecha_ingreso:null}
  }

  limpiarFiltros():void{
    this.filtrosNombre = null;
    this.filtrosFecha = null ;
    this.usuariosFiltro = null;
    this.filters={nombre:null,fecha_ingreso:null,usuario_asignado:null,cantidad:null,fecha_modificacion:null,idMercancia:null,last_user:null};

  }

  cargarFiltros():void{
    this.filters = {nombre:this.filtrosNombre,fecha_ingreso:this.filtrosFecha,usuario_asignado:this.usuariosFiltro,cantidad:null,fecha_modificacion:null,idMercancia:null,last_user:null}
    this.mercanciaService.getDatosFiltros(this.filters).subscribe({
      next: es=>{
        this.mercancias=es
      },
      error: error=>{
        setTimeout(() => this.staticAlert.close(), 2000);
        this._danger.next(error['error'].descripcion);
      }
    });
    
  }
}
