import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:9090/api/v1/auth';

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(resp => {

        const token = resp.token;
        localStorage.setItem('token', token);

        const decoded: any = jwtDecode(token);
        const username = decoded.username || decoded.sub;
        localStorage.setItem('username', username);

        const role = decoded.rol || decoded.role;
        localStorage.setItem('role', role);
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  getRole(): string | null {
  const token = localStorage.getItem('token'); // o donde guardes tu token
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // si usas JWT
    return payload.role || payload.rol || null; // ajusta según el nombre del campo en tu token
  } catch (e) {
    return null;
  }
  
}

}
