import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CargosComponent } from './cargos/cargos.component';
import { FormCargosComponent } from './cargos/form-cargos.component';
import {NgbModule, NgbAlert} from '@ng-bootstrap/ng-bootstrap';
// import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FornUsuariosComponent } from './usuarios/forn-usuarios.component';
import { MercanciaComponent } from './mercancia/mercancia.component';
import { FormMercanciaComponent } from './mercancia/form-mercancia.component';


const routes:Routes=[
  { path:'',redirectTo:'/mercancias',pathMatch:'full' },
  { path:'cargos',component:CargosComponent },
  { path:'cargos/form',component:FormCargosComponent },
  { path:'cargos/form/:id',component:FormCargosComponent },
  { path:'usuarios',component:UsuariosComponent },
  { path:'usuarios/form',component:FornUsuariosComponent },
  { path:'usuarios/form/:id',component:FornUsuariosComponent },
  { path:'mercancias',component:MercanciaComponent },
  { path:'mercancias/form',component:FormMercanciaComponent },
  { path:'mercancias/form/:id',component:FormMercanciaComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    CargosComponent,
    FormCargosComponent,
    UsuariosComponent,
    FornUsuariosComponent,
    MercanciaComponent,
    FormMercanciaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
