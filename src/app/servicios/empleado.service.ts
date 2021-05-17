import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../modelos/empleado-modelo';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  url: string = 'http://localhost/backEmpleados/empleados/';

  constructor(private http: HttpClient) { }
   /**
   * agregar empleado al servicio
   */
  addEmpleado(empleado: Empleado): Observable<any>
      {
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = {
          nombre : empleado.nombre,
          fechaNacimiento : empleado.fechaNacimiento,
          pais: empleado.pais,
          nombreUsuario : empleado.nombreUsuario,
          fechaContratacion:empleado.fechaContratacion,
          estado : empleado.estado,
          area : empleado.area,
          cargo : empleado.cargo,
          comision:empleado.comision,
        };
         return  this.http.post(this.url + "addEmpleado.php", JSON.stringify(options), headers);
       }
  
     /**
   * editar empleado al servicio
   */
  editarEmpleado(empleado: Empleado): Observable<any>
  {
     console.log(empleado);
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      id : empleado.id,
      nombre : empleado.nombre,
      fechaNacimiento : empleado.fechaNacimiento,
      pais: empleado.pais,
      nombreUsuario : empleado.nombreUsuario,
      fechaContratacion:empleado.fechaContratacion,
      estado : empleado.estado,
      area : empleado.area,
      cargo : empleado.cargo,
      comision:empleado.comision,
    };
     return  this.http.post(this.url + "updateEmpleado.php", JSON.stringify(options), headers);
   }
    /**
   * listar empleados del servicio
   */
  listEmpleados(): Observable<Empleado[]>{
    return  this.http.get<Empleado[]>(this.url + "listaEmpleados.php");
  }
  /**
   * traer empleado por id
   */
   getEmpleadoById(id: string):Observable<Empleado[]>{
     return this.http.get<Empleado[]>(this.url + "getEmpleadoById.php?id="+id);
  }
  /**
   * eliminar empleado por id
   */
   deletetEmpleadoById(id: string):Observable<any>{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      id : id,
    };
    return this.http.post(this.url + "deleteEmpleadoById.php",JSON.stringify(options), headers);
 }

   /**
   * traer paises del servicio proporsionado en l aprueba
   */
  getPaises():Observable<any[]>{
    return  this.http.get<any[]>('https://restcountries.eu/rest/v2/region/Americas');
  }

  
}
