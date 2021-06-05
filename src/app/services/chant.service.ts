import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChant } from '../interfaces/chant.interface';
import { ChantFacadeService } from './chant-facade.service';
import { IChantPrecomputed } from '../interfaces/chant-precomputed.interface';
import { DataSourceService } from './data-source.service';

const baseUrl = 'http://localhost:8000/api/chants';

@Injectable({
  providedIn: 'root'
})
export class ChantService {

  constructor(private http: HttpClient,
              private chantFacadeService: ChantFacadeService,
              private dataSourceService: DataSourceService
  ) { }

  private readonly _chant = new BehaviorSubject<IChant>(null);

  getAll(): Observable<any> {
    let dataSources = this.dataSourceService.sourceList;
    return this.http.post(`${baseUrl}/`, dataSources);
  }

  get(id: any): Observable<IChant> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // TODO remove
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

  findByIncipit(incipit: string): Observable<any> {
    let dataSources = this.dataSourceService.sourceList;
    return this.http.post(`${baseUrl}?incipit=${incipit}/`, dataSources);
  }

  setChant(id: number): void {
    this.http.get<IChant>(`${baseUrl}/${id}`).subscribe(
      (data: IChant) => this.chantFacadeService.setChant(data)
    );
  }

  setChantPrecomputed(id: number): void {
    this.http.get<IChantPrecomputed>(`${baseUrl}/${id}`).subscribe(
      (data: IChantPrecomputed) => this.chantFacadeService.setChantPrecomputed(data)
    );
  }

  setList(incipit: string = null): void {
    let dataSources = this.dataSourceService.sourceList;
    let url: string = incipit ? 
                        `${baseUrl}?incipit=${incipit}/` :
                        `${baseUrl}/`;
    this.http.post(url, dataSources).subscribe(
      (data: IChant[]) => this.chantFacadeService.setList(data)
    );
  }

  getAligned(data: number[]): Observable<any> {
    return this.http.post(`${baseUrl}/align/`, data);
  }

  updateSelection(data: number[]): Observable<any> {
    return this.http.post(`${baseUrl}/selectDatasets/`, data);
  }
}
