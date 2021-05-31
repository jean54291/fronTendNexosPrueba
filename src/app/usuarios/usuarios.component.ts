import { Component, OnInit, ViewChild } from '@angular/core';
import {Subject} from 'rxjs';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  
  titulo:string="Lista de Usuarios";
  usuarios:Usuarios[];
  status:string;
  errorMessage:string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  dangerMessage = '';

  usuariosX:Usuarios[];
  usuariosLogin:Usuarios = new Usuarios();
  selectUsuario="";

  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getAll().subscribe(
      user=>this.usuarios=user
    );
    this.usuariosService.getAll().subscribe(
      user=>this.usuariosX=user
    );
    this._success.subscribe(message => this.successMessage = message);
    this._danger.subscribe(message => this.dangerMessage = message);
  }


  delete(user:Usuarios,userLogin:Usuarios):void{
    if(userLogin.idUsuario){
      this.usuariosService.delete(user.idUsuario,10).subscribe({
        next:data=>{
          this._success.next("Se elimino el registro exitosamente");
          setTimeout(() => this.staticAlert.close(), 2000);
          this.usuariosService.getAll().subscribe({
            next:response=>{
              this.usuarios=response
            },
            error: error_get=>{
              setTimeout(() => this.staticAlert.close(), 2000);
              this._danger.next(error_get['error'].descripcion);
              this.usuarios=[];
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
      this._danger.next("Por favor valida el usuario login");
    }
    
  }

  getUsuarios():void{
    this.usuariosService.getAll().subscribe(
      users=>this.usuariosX=users
    );
  }
  getUsuario(llave):void{
    let value = this.usuariosX.find(x => x.idUsuario == llave);
    this.usuariosLogin={"idUsuario":llave,"nombre":value.nombre,"edad":null,"cargo":null,fecha_ingreso:null}
    
  }

}
