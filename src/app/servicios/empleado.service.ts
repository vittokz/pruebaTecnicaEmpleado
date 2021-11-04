import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../modelos/empleado-modelo';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  url: string = 'http://localhost/backEmpleados/empleados/';

  constructor(private http: HttpClient) {}
  /**
   * agregar empleado al servicio
   */
  addEmpleado(empleado: Empleado): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      id: empleado.id,
      firstName: empleado.firstName,
      lastName: empleado.lastName,
      documentNumber: empleado.documentNumber,
      Title: empleado.Title,
      avatar: empleado.avatar,
    };
    return this.http.post(
      'https://6184032a91d76c00172d1d1c.mockapi.io/api/v1/users',
      JSON.stringify(options),
      headers
    );
  }

  /**
   * editar empleado al servicio
   */
  editarEmpleado(empleado: Empleado): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      id: empleado.id,
      firstName: empleado.firstName,
      lastName: empleado.lastName,
      documentNumber: empleado.documentNumber,
      Title: empleado.Title,
      avatar: empleado.avatar,
    };
    return this.http.put(
      'https://6184032a91d76c00172d1d1c.mockapi.io/api/v1/users/' + empleado.id,
      JSON.stringify(options),
      headers
    );
  }
  /**
   * listar empleados del servicio
   */
  listEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(
      'https://6184032a91d76c00172d1d1c.mockapi.io/api/v1/users'
    );
  }
  /**
   * traer empleado por id
   */
  getEmpleadoById(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(
      'https://6184032a91d76c00172d1d1c.mockapi.io/api/v1/users/' + id
    );
  }
  /**
   * eliminar empleado por id
   */
  deletetEmpleadoById(id: string): Observable<any> {
    return this.http.delete(
      'https://6184032a91d76c00172d1d1c.mockapi.io/api/v1/users/' + id
    );
  }
}
