import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import CONFIG from '../config.json';
import { IChantPrecomputed } from '../interfaces/chant-precomputed.interface';
import { IChant } from '../interfaces/chant.interface';
import { DataSourceService } from './data-source.service';
import { IncipitService } from './incipit.service';
import { SearchFilterService } from './search-filter.service';


@Injectable({
  providedIn: 'root'
})
export class ChantService {

  constructor(
    private http: HttpClient,
    private dataSourceService: DataSourceService,
    private searchFilterService: SearchFilterService,
    private incipitService: IncipitService
  ) { }

  private readonly _chantList = new BehaviorSubject<IChant[]>(null);
  private readonly _baseUrl = CONFIG['BACKEND_URL'];

  // TODO remove
  getAll(): Observable<any> {
    return this.dataSourceService.getSourceList()
      .pipe(
        switchMap(dataSources => this.http.post(`${this._baseUrl}/`, dataSources))
      );
  }

  // TODO remove
  create(data: any): Observable<any> {
    return this.http.post(this._baseUrl, data);
  }

  getChant(id: number): Observable<IChantPrecomputed> {
    return this.http.get<IChantPrecomputed>(`${this._baseUrl}/${id}`);
  }

  loadData(): Observable<IChant[]> {
    return combineLatest([
      this.dataSourceService.getSourceList(),
      this.searchFilterService.getFilterSettings(),
      this.incipitService.getIncipit()
    ]).pipe(
      switchMap(
        ([dataSources, filterSettings, incipit]) => {
          const formData = new FormData();
          formData.append('dataSources', dataSources ? JSON.stringify(dataSources) : "[]");
          formData.append('incipit', incipit ? incipit : '');
          formData.append('genres', filterSettings ? JSON.stringify(filterSettings['genres']) : "[]");
          formData.append('offices', filterSettings ? JSON.stringify(filterSettings['offices']) : "[]");
          return this.http.post(this._baseUrl + '/', formData);
        }
      ),
      tap((data: IChant[]) => this._chantList.next(data))
    );
  }

  getList(): BehaviorSubject<IChant[]> {
    return this._chantList;
  }

  getAlignment(formData: FormData): Observable<any> {
    return this.http.post(`${this._baseUrl}/align/`, formData);
  }

  //REMOVE
  getAlignedTexts(data: number[]): Observable<any> {
    return this.http.post(`${this._baseUrl}/align-text/`, data);
  }

  //REMOVVE
  updateSelection(data: number[]): Observable<any> {
    return this.http.post(`${this._baseUrl}/selectDatasets/`, data);
  }

  getDataSources(): Observable<any> {
    return this.http.get(`${this._baseUrl}/sources`);
  }

  exportChants(data: FormData): Observable<any> {
    return this.http.post(`${this._baseUrl}/export/`, data, {responseType: 'arraybuffer'});
  }

  createDataset(data: FormData): Observable<any> {
    return this.http.post(`${this._baseUrl}/create-dataset/`, data);
  }
}
