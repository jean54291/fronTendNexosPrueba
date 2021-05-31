import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import { Cargo } from '../cargos/cargo';
import { CargoService } from '../cargos/cargo.service';
import { Usuarios } from './usuarios';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-forn-usuarios',
  templateUrl: './forn-usuarios.component.html',
  styleUrls: ['./forn-usuarios.component.css']
})
export class FornUsuariosComponent implements OnInit {

  private _danger = new Subject<string>();
  dangerMessage = '';
  staticAlertClosed = false;
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;

  titulo:string="Registro de Usuarios";
  usuarios:Usuarios = new Usuarios();
  cargos:Cargo[];

  selectCargo:"";
  selectCargos:"";
  selectedValue = null;
  constructor(private usuariosService:UsuariosService,private cargoService:CargoService,private router:Router, private activatedRoute:ActivatedRoute) { }



  ngOnInit(): void {
    this.getCargos();
    this.cargar();
    this._danger.subscribe(message => this.dangerMessage = message);
  }

  create():void{
    console.log(this.selectCargo)
    this.usuariosService.create(this.usuarios).subscribe({
      next: es=>{
        this.router.navigate(['/usuarios']);
      },
      error: error=>{
        setTimeout(() => this.staticAlert.close(), 2000);
        this._danger.next(error['error'].descripcion);
      }
    });
  }
  cargar():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.usuariosService.get(id).subscribe({
            next: es=>{
              this.usuarios=es[0];
              this.selectCargo=es[0]['cargo'].idCargo;
            },
            error: error=>{}
          });           
        }
      }
    );
  }
  update():void{
    this.usuariosService.update(this.usuarios).subscribe(
      e=>this.router.navigate(['/usuarios'])
    );
  }

  getCargos():void{
    this.cargoService.getAll().subscribe(
      cargo_ar=>this.cargos=cargo_ar
    );
  }

  getCargo(llave):void{
    console.log(llave)
    console.log(this.cargos)
    let value = this.cargos.find(x => x.idCargo == llave);
    this.usuarios.cargo={"idCargo":llave,"descripcion":value.descripcion}
    console.log(value)
  }

}
