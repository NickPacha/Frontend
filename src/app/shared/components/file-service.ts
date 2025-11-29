import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = 'http://localhost:8080/api/files';

  constructor(private http: HttpClient) {}

  // Subir varios archivos
  uploadFiles(files: File[]): Observable<HttpEvent<any>> {

    const formData = new FormData();

    files.forEach(file => {
      formData.append('archivos', file);
    });

    const req = new HttpRequest('POST', `${this.apiUrl}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${id}`, {
      responseType: 'blob'
    });
  }

  deleteFile(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
