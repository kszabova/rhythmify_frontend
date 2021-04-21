import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chant } from '../models/chant.model';
import { ChantFacadeService } from './chant-facade.service';

const baseUrl = 'http://localhost:8000/api/melodies';

@Injectable({
  providedIn: 'root'
})
export class ChantService {

  constructor(private http: HttpClient,
              private chantFacadeService: ChantFacadeService) { }

  getAll(): Observable<Chant[]> {
    return this.http.get<Chant[]>(baseUrl);
  }

  get(id: any): Observable<Chant> {
    return this.http.get(`${baseUrl}/${id}/detail`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByIncipit(incipit: any): Observable<Chant[]> {
    return this.http.get<Chant[]>(`${baseUrl}?incipit=${incipit}`);
  }

  setChant(id: any): void {
    this.chantFacadeService.chant = this.http.get(`${baseUrl}/${id}/detail`);
  }

  getAligned(data: number[]): Observable<any> {
    return this.http.post(`${baseUrl}/align/`, data);
  }
}
