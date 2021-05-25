import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CsvTranslateService {
  genres: object;
  feasts: object;
  offices: object;

  constructor(
    private http: HttpClient
  ) { }

  getGenre(genre_id: string): Observable<string> {
    if (!this.genres) {
      return this.loadCSV("genres").pipe(map(
        data => {
          this.genres = data;
          return this.genres[genre_id].description;
        }
      ));
    }
    
    else {
      return of(this.genres[genre_id].description);
    }
  }

  getOffice(office_id: string): Observable<string> {
    if (!this.offices) {
      return this.loadCSV("offices").pipe(map(
        data => {
          this.offices = data;
          return this.offices[office_id].description;
        }
      ));
    }
    
    else {
      return of(this.offices[office_id].description);
    }
  }

  loadCSV(json: string): Observable<object> {
    let path: string;
    switch (json) {
      case "genres": {
        path = "assets/json/genre.json";
        break;
      }
      case "feasts": {
        path = "assets/json/feast.json";
        break;
      }
      case "offices": {
        path = "assets/json/office.json";
        break;
      }
      default: {
        throw new Error("Unknown json option");
      }
    }

    return this.http.get(path);
  }
}
