import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MigrationPayload } from './migration.interface';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {
  private apiUrl = 'http://appgwfsdesa.telefonicawebsites.co/telefonica/v1/manage-migrations/migration';

  constructor(private http: HttpClient) {}

  migrate(payload: MigrationPayload): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<void>(this.apiUrl, payload, { headers });
  }
}