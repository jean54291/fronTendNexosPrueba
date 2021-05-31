import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Cargo } from './cargo';
@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private url:string="http://localhost:1995/webservices/cargos";
  constructor( private http:HttpClient) { }

  //obtener Cargos
  getAll():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(this.url);
  }
  //crear Cargo
  create(cargo:Cargo):Observable<Cargo>{
    return this.http.post<Cargo>(this.url,cargo);
  }

  get(id:number):Observable<Cargo>{
    return this.http.get<Cargo>(this.url+"/getDatoId/"+id);
  }

  update(cargo:Cargo):Observable<Cargo>{
    return this.http.put<Cargo>(this.url,cargo);
  }

  delete(id:number,idUsuario:number):Observable<any>{
    // return this.http.get(this.url+"/"+id+"/"+idUsuario);
    return this.http.delete<any>(this.url+"/"+id+"/"+idUsuario);
  }

}
