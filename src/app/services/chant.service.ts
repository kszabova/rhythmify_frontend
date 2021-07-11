import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IChantPrecomputed } from '../interfaces/chant-precomputed.interface';
import { IChant } from '../interfaces/chant.interface';
import { DataSourceService } from './data-source.service';
import { IncipitService } from './incipit.service';
import { SearchFilterService } from './search-filter.service';

const baseUrl = 'http://localhost:8000/api/chants';

@Injectable({
  providedIn: 'root'
})
export class ChantService {

  constructor(private http: HttpClient,
              private dataSourceService: DataSourceService,
              private searchFilterService: SearchFilterService,
              private incipitService: IncipitService
  ) { }

  private readonly _chantList = new BehaviorSubject<IChant[]>(null);

  // TODO remove
  getAll(): Observable<any> {
    return this.dataSourceService.getSourceList()
      .pipe(
        switchMap(dataSources => this.http.post(`${baseUrl}/`, dataSources))
      );
  }

  // TODO remove
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getChant(id: number): Observable<IChantPrecomputed> {
    return this.http.get<IChantPrecomputed>(`${baseUrl}/${id}`);
  }

  loadData(): Observable<IChant[]> {
    return combineLatest([
      this.dataSourceService.getSourceList(),
      this.searchFilterService.getFilterSettings(),
      this.incipitService.getIncipit()
    ]).pipe(
      switchMap(
        ([dataSources, filterSettings, incipit]) => {
          const formData: FormData = new FormData();
          formData.append('dataSources', dataSources ? JSON.stringify(dataSources) : "[]");
          formData.append('incipit', incipit ? incipit : '');
          formData.append('genres', filterSettings ? JSON.stringify(filterSettings['genres']) : "[]");
          formData.append('offices', filterSettings ? JSON.stringify(filterSettings['offices']) : "[]");
          return this.http.post(baseUrl + '/', formData);
        }
      ),
      tap((data: IChant[]) => this._chantList.next(data))
    );
  }

  getList(): BehaviorSubject<IChant[]> {
    return this._chantList;
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

  createDataset(data: FormData): Observable<any> {
    return this.http.post(`${baseUrl}/create-dataset/`, data);
  }
}
