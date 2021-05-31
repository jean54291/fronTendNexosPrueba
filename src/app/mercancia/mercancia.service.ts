import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Mercancia } from './mercancia';

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {

  private url:string="http://localhost:1995/webservices/mercancia";
  constructor( private http:HttpClient) { }

    //obtener users
    getAll():Observable<Mercancia[]>{
      return this.http.get<Mercancia[]>(this.url);
    }
    //crear Cargo
    create(user:Mercancia):Observable<Mercancia>{
      return this.http.post<Mercancia>(this.url,user);
    }
  
    get(id:number):Observable<Mercancia>{
      return this.http.get<Mercancia>(this.url+"/getDatoId/"+id);
    }
  
    update(user:Mercancia):Observable<Mercancia>{
      return this.http.put<Mercancia>(this.url,user);
    }
  
    delete(id:number,idUsuario:number):Observable<any>{
      return this.http.delete<any>(this.url+"/"+id+"/"+idUsuario);
    }

    getDatosFiltros(user:Mercancia):Observable<Mercancia>{
      return this.http.post<Mercancia>(this.url+"/listarMercancia",user);
    }

}
