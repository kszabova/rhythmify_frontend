import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CsvTranslateService } from 'src/app/services/csv-translate.service';
import { SearchFilterService } from 'src/app/services/search-filter.service';
import { SavedFilterDialogComponent } from '../dialogs/saved-filter-dialog/saved-filter-dialog.component';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  allGenres: object;
  allOffices: object;

  genreIds: string[] = [];
  officeIds: string[] = [];

  checkedGenres: boolean[] = [];
  checkedOffices: boolean[] = [];
  checkedAllGenres = true;
  checkedAllOffices = true;

  visible = false;

  constructor(
    private csvTranslateService: CsvTranslateService,
    private searchFilterService: SearchFilterService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initGenresAndOffices();

  }

  initGenresAndOffices(): void {
    this.csvTranslateService.getAllValues("genres")
      .pipe(take(1))
      .subscribe(
        data => {
          this.allGenres = data;
          Object.keys(this.allGenres).forEach(key => {
            this.genreIds.push(key);
            this.checkedGenres.push(true);
          });
        }
      );
    this.csvTranslateService.getAllValues("offices")
      .pipe(take(1))
      .subscribe(
        data => {
          this.allOffices = data;
          Object.keys(this.allOffices).forEach(key => {
            this.officeIds.push(key);
            this.checkedOffices.push(true);
          });
          this.saveFilter(false);
        }
      );
  }

  getFilterSettings(): object {
    let genres = [];
    for (let g = 0; g < this.checkedGenres.length; g++) {
      if (this.checkedGenres[g]) {
        genres.push(this.genreIds[g]);
      }
    }

    let offices = [];
    for (let o = 0; o < this.checkedOffices.length; o++) {
      if (this.checkedOffices[o]) {
        offices.push(this.officeIds[o]);
      }
    }

    return {
      "genres": genres,
      "offices": offices
    };
  }

  saveFilter(showDialog: boolean = true): void {
    let filterSettings = this.getFilterSettings();
    this.searchFilterService.setFilterSettings(filterSettings);
    if (showDialog) {
      this.dialog.open(SavedFilterDialogComponent);
    }
  }

  checkAllGenres(): void {
    for (var i=0; i<this.checkedGenres.length; i++) {
      this.checkedGenres[i] = this.checkedAllGenres;
    }
  }

  checkAllOffices(): void {
    for (var i=0; i<this.checkedOffices.length; i++) {
      this.checkedOffices[i] = this.checkedAllOffices;
    }
  }

}
