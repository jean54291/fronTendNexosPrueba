import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from './cargo';
import { CargoService } from './cargo.service';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-form-cargos',
  templateUrl: './form-cargos.component.html',
  styleUrls: ['./form-cargos.component.css']
})
export class FormCargosComponent implements OnInit {
  
  private _danger = new Subject<string>();
  dangerMessage = '';
  staticAlertClosed = false;
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;

  titulo:string="Registro de Cargos";
  cargos:Cargo = new Cargo();
  constructor(private cargoSerice:CargoService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
    this._danger.subscribe(message => this.dangerMessage = message);
  }

  create():void{
    this.cargoSerice.create(this.cargos).subscribe({
      next: es=>{
        this.router.navigate(['/cargos']);
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
          this.cargoSerice.get(id).subscribe(
            es=>this.cargos=es[0]
          );
        }
      }
    );
  }
  update():void{
    this.cargoSerice.update(this.cargos).subscribe(
      e=>this.router.navigate(['/cargos'])
    );
  }

}
