import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url:string="http://localhost:1995/webservices/usuarios";
  constructor( private http:HttpClient) { }

  
  //obtener users
  getAll():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.url);
  }
  //crear Cargo
  create(user:Usuarios):Observable<Usuarios>{
    return this.http.post<Usuarios>(this.url,user);
  }

  get(id:number):Observable<Usuarios>{
    return this.http.get<Usuarios>(this.url+"/getDatoId/"+id);
  }

  update(user:Usuarios):Observable<Usuarios>{
    return this.http.put<Usuarios>(this.url,user);
  }

  delete(id:number,idUsuario:number):Observable<any>{
    return this.http.delete<any>(this.url+"/"+id+"/"+idUsuario);
  }

}
