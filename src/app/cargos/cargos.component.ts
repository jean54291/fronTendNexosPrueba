import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Cargo } from './cargo';
import { CargoService } from './cargo.service';
import {Subject} from 'rxjs';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuarios } from '../usuarios/usuarios';


// import { NgbdAlertCloseable } from './alert-closeable';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  titulo:string="Lista de Cargos";
  cargos:Cargo[];
  status:string;
  errorMessage:string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  selectUsuario="";

  dangerMessage = '';
  usuarios:Usuarios[];
  usuariosLogin:Usuarios = new Usuarios();

  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private cargoService:CargoService,private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getAll().subscribe(
      user=>this.usuarios=user
    );
    this.cargoService.getAll().subscribe(
      cargo_ar=>this.cargos=cargo_ar
    );
    this._success.subscribe(message => this.successMessage = message);
    this._danger.subscribe(message => this.dangerMessage = message);
  }

  delete(cargo:Cargo,user:Usuarios):void{
    console.log(user)
    if(user.idUsuario){
      this.cargoService.delete(cargo.idCargo,user.idUsuario).subscribe({
        next:data=>{
          this._success.next("Se elimino el registro exitosamente");
          setTimeout(() => this.staticAlert.close(), 2000);
          this.cargoService.getAll().subscribe({
            next:response=>{
              this.cargos=response
            },
            error: error_get=>{
              setTimeout(() => this.staticAlert.close(), 2000);
              this._danger.next(error_get['error'].descripcion);
              this.cargos=[];
            }
          });
        },
        error: error=>{
          setTimeout(() => this.staticAlert.close(), 2000);
          this._danger.next(error['error'].descripcion);
        } 
      });
    }else{
      this._danger.next("por favor escoge usuario login");
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

}

