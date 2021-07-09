import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CsvTranslateService } from 'src/app/services/csv-translate.service';
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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initGenresAndOffices();
  }

  initGenresAndOffices(): void {
    this.csvTranslateService.getAllValues("genres").subscribe(
      data => {
        this.allGenres = data;
        Object.keys(this.allGenres).forEach(key => {
          this.genreIds.push(key);
          this.checkedGenres.push(true);
        });
      }
    );
    this.csvTranslateService.getAllValues("offices").subscribe(
      data => {
        this.allOffices = data;
        Object.keys(this.allOffices).forEach(key => {
          this.officeIds.push(key);
          this.checkedOffices.push(true);
        });
      }
    );
  }

  saveFilter(): void {
    this.dialog.open(SavedFilterDialogComponent);
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
