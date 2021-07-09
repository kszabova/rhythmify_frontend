import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { IChant } from '../interfaces/chant.interface';
import { ChantFacadeService } from './chant-facade.service';
import { IChantPrecomputed } from '../interfaces/chant-precomputed.interface';
import { DataSourceService } from './data-source.service';
import { switchMap } from 'rxjs/operators';
import { SearchFilterService } from './search-filter.service';

const baseUrl = 'http://localhost:8000/api/chants';

@Injectable({
  providedIn: 'root'
})
export class ChantService {

  constructor(private http: HttpClient,
              private chantFacadeService: ChantFacadeService,
              private dataSourceService: DataSourceService,
              private searchFilterService: SearchFilterService
  ) { }

  private readonly _chant = new BehaviorSubject<IChant>(null);

  getAll(): Observable<any> {
    return this.dataSourceService.getSourceList()
      .pipe(
        switchMap(dataSources => this.http.post(`${baseUrl}/`, dataSources))
      );
  }

  get(id: any): Observable<IChant> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // TODO remove
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  findByIncipit(incipit: string): Observable<any> {
    return this.dataSourceService.getSourceList()
      .pipe(
        switchMap(dataSources => this.http.post(`${baseUrl}?incipit=${incipit}/`, dataSources))
      );
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
    combineLatest([this.dataSourceService.getSourceList(),
                   this.searchFilterService.getFilterSettings()]).subscribe(
      ([dataSources, filterSettings]) => {
        const formData: FormData = new FormData();
        formData.append('dataSources', dataSources ? JSON.stringify(dataSources) : "[]");
        formData.append('incipit', incipit ? incipit : '');
        formData.append('genres', filterSettings ? JSON.stringify(filterSettings['genres']) : "[]");
        formData.append('offices', filterSettings ? JSON.stringify(filterSettings['offices']) : "[]");
        this.http.post(baseUrl + '/', formData).subscribe(
          (data: IChant[]) => this.chantFacadeService.setList(data)
        );
      }
    )
  }

  getAlignment(formData: FormData): Observable<any> {
    return this.http.post(`${baseUrl}/align/`, formData);
  }

  getAlignedTexts(data: number[]): Observable<any> {
    return this.http.post(`${baseUrl}/align-text/`, data);
  }

  updateSelection(data: number[]): Observable<any> {
    return this.http.post(`${baseUrl}/selectDatasets/`, data);
  }

  getDataSources(): Observable<any> {
    return this.http.get(`${baseUrl}/sources`);
  }

  exportChants(data: FormData): Observable<any> {
    return this.http.post(`${baseUrl}/export/`, data, {responseType: 'arraybuffer'});
  }
}
