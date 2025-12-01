import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo, Nivel } from './vehiculo.model';

@Injectable({ providedIn: 'root' })
export class VehiculoService {
  
  constructor(private http: HttpClient) { }

  private base = '/api/v1';

  listVehiculos() {
    return this.http.get<Vehiculo[]>(`${this.base}/vehiculos`);
  }

  getVehiculo(id: number) {
    return this.http.get<Vehiculo>(`${this.base}/vehiculo/${id}`);
  }

  createVehiculo(data: any) {
    return this.http.post(`${this.base}/vehiculo`, data);
  }

  updateVehiculo(id: number, payload: any) {
    return this.http.put(`${this.base}/vehiculo/${id}`, payload);
  }

  deleteVehiculo(id: number) {
    return this.http.delete(`${this.base}/vehiculo/${id}`);
  }


  listNiveles() {
    return this.http.get<Nivel[]>(`${this.base}/niveles`);
  }
}
