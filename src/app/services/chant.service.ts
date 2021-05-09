import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChant } from '../interfaces/chant.interface';
import { ChantFacadeService } from './chant-facade.service';
import { IChantPrecomputed } from '../interfaces/chant-precomputed.interface';

const baseUrl = 'http://localhost:8000/api/melodies';

@Injectable({
  providedIn: 'root'
})
export class ChantService {

  constructor(private http: HttpClient,
              private chantFacadeService: ChantFacadeService
  ) { }

  private readonly _chant = new BehaviorSubject<IChant>(null);

  getAll(): Observable<IChant[]> {
    return this.http.get<IChant[]>(baseUrl);
  }

  get(id: any): Observable<IChant> {
    return this.http.get(`${baseUrl}/${id}/detail`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  findByIncipit(incipit: string): Observable<IChant[]> {
    return this.http.get<IChant[]>(`${baseUrl}?incipit=${incipit}`);
  }

  setChant(id: number): void {
    this.http.get<IChant>(`${baseUrl}/${id}/detail`).subscribe(
      (data: IChant) => this.chantFacadeService.setChant(data)
    );
  }

  setChantPrecomputed(id: number): void {
    this.http.get<IChantPrecomputed>(`${baseUrl}/${id}/detail`).subscribe(
      (data: IChantPrecomputed) => this.chantFacadeService.setChantPrecomputed(data)
    );
  }

  setList(incipit: string = null): void {
    var url: string = incipit ? 
                        `${baseUrl}?incipit=${incipit}` :
                        baseUrl;
    this.http.get<IChant[]>(url).subscribe(
      (data: IChant[]) => this.chantFacadeService.setList(data)
    );
  }

  getAligned(data: number[]): Observable<any> {
    return this.http.post(`${baseUrl}/align/`, data);
  }
}
