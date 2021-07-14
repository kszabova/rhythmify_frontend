import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

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

  getGenre(genre_id: string): string {
    if (!this.genres) {
      this.loadCSV("genres")
        .pipe(take(1))
        .subscribe(
          data => {
            this.genres = data;
            return this.genres[genre_id].description;
          }
        );
    }
    
    else {
      return this.genres[genre_id].description;
    }
  }

  getOffice(office_id: string): string {
    if (null === office_id) {
      return "Unknown";
    }

    if (!this.offices) {
      this.loadCSV("offices")
        .pipe(take(1))
        .subscribe(
          data => {
            this.offices = data;
            return this.offices[office_id].description;
          }
        );
    }
    
    else {
      return this.offices[office_id].description;
    }
  }
  
  getAllValues(type: string) {
    return this.loadCSV(type);
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
