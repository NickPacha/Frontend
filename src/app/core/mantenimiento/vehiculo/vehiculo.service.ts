import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo, Nivel } from './vehiculo.model';

@Injectable({ providedIn: 'root' })
export class VehiculoService {
  // ya no usamos '/api' como base; llamamos rutas relativas para que el proxy redireccione
  constructor(private http: HttpClient) { }

  private base = '/api';
  
  listVehiculos() {
    return this.http.get<Vehiculo[]>(`${this.base}/vehiculos`);
  }

  getVehiculo(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`*api/vehiculo/${id}`);
  }

  createVehiculo(payload: any) {
    return this.http.post('/api/vehiculo', payload);
  }

  updateVehiculo(id: number, payload: any) {
    return this.http.put(`/api/vehiculo/${id}`, payload);
  }

  deleteVehiculo(id: number) {
    return this.http.delete(`/api/vehiculo/${id}`);
  }

  
  listNiveles() {
    return this.http.get<Nivel[]>(`${this.base}/niveles`);
  }
}
