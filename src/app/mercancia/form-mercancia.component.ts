
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import { Usuarios } from '../usuarios/usuarios';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Mercancia } from './mercancia';
import { MercanciaService } from './mercancia.service';


// import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-form-mercancia',
  templateUrl: './form-mercancia.component.html',
  styleUrls: ['./form-mercancia.component.css']
})
export class FormMercanciaComponent implements OnInit {

  titulo:string="Registrar de Mercancia";
  private _danger = new Subject<string>();
  dangerMessage = '';
  staticAlertClosed = false;
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;


  mercancia:Mercancia = new Mercancia();
  usuarioLogin:Usuarios[];
  usuario:Usuarios[];
  usuario_modificacion:Usuarios[];

  selectlast_user:"";
  selectUsuario:"";
  selectedValue = null

  constructor(private usuariosService:UsuariosService,private mercanciaServicio:MercanciaService,private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.cargar();
    this._danger.subscribe(message => this.dangerMessage = message);
  }

  create():void{

    this.mercanciaServicio.create(this.mercancia).subscribe({
      next: es=>{
        this.router.navigate(['/mercancias']);
      },
      error: error=>{
        this._danger.next(error['error'].descripcion);
      }
    });
  }
  cargar():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.mercanciaServicio.get(id).subscribe({
            next: es=>{
              this.mercancia=es[0];
              this.selectUsuario=es[0]['usuario_asignado'].idUsuario;
              this.selectlast_user=es[0]['last_user'].idUsuario;
            },
            error: error=>{}
          });           
        }
      }
    );
  }
  update():void{
    this.mercanciaServicio.update(this.mercancia).subscribe({
      next: es=>{
        this.router.navigate(['/mercancias'])
      },
      error: error=>{
        setTimeout(() => this.staticAlert.close(), 2000);
        this._danger.next(error['error'].descripcion);
      }
    });
  }

  getUsuarios():void{
    this.usuariosService.getAll().subscribe(
      usuario_login=>this.usuarioLogin=usuario_login
    );
  }

  getUsuario(llave):void{
    let value = this.usuarioLogin.find(x => x.idUsuario == llave);
    this.mercancia.usuario_asignado={"idUsuario":llave,"nombre":value.nombre,"edad":null,"cargo":null,fecha_ingreso:null}
    console.log(value)
  }

  getUsuarioModifica(llave):void{
    let value = this.usuarioLogin.find(x => x.idUsuario == llave);
    this.mercancia.last_user={"idUsuario":llave,"nombre":value.nombre,"edad":null,"cargo":null,fecha_ingreso:null}
    console.log(value)
  }

}
