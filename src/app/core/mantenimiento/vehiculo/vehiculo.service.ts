import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo, Nivel } from './vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private api = 'http://localhost:9090/api/v1';

  constructor(private http: HttpClient) { }

  // -------------------
  // NIVELES
  // -------------------
  listNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(`${this.api}/niveles`);
  }

  // -------------------
  // VEHÍCULOS
  // -------------------
  listVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.api}/vehiculos`);
  }

  getVehiculo(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.api}/vehiculos/${id}`);
  }

  createVehiculo(data: any): Observable<any> {
    return this.http.post(`${this.api}/vehiculos`, data);
  }

  updateVehiculo(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/vehiculos/${id}`, data);
  }

  deleteVehiculo(id: number): Observable<any> {
    return this.http.delete(`${this.api}/vehiculos/${id}`);
  }
}
