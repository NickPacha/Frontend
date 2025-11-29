import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo, Nivel } from './vehiculo.model';

@Injectable({ providedIn: 'root' })
export class VehiculoService {
  private base = '/api'; // Ajusta si tu proxy / prefijo es distinto
  constructor(private http: HttpClient) {}

  // Vehículos
  listVehiculos(params?: any): Observable<Vehiculo[]> {
    // params opcionales para filtrar/paginación
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(k => {
        if (params[k] !== null && params[k] !== undefined) {
          httpParams = httpParams.set(k, params[k]);
        }
      });
    }
    return this.http.get<Vehiculo[]>(`${this.base}/vehiculos`, { params: httpParams });
  }

  getVehiculo(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.base}/vehiculos/${id}`);
  }

  createVehiculo(payload: any): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.base}/vehiculos`, payload);
  }

  updateVehiculo(id: number, payload: any): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.base}/vehiculos/${id}`, payload);
  }

  // Soft delete -> backend implements estado='I'
  deleteVehiculo(id: number): Observable<any> {
    return this.http.delete(`${this.base}/vehiculos/${id}`);
  }

  // Niveles (para combo)
  listNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(`${this.base}/niveles`);
  }
}
