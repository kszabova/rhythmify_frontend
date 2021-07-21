import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IChant } from 'src/app/interfaces/chant.interface';
import { AlignmentService } from 'src/app/services/alignment.service';
import { ChantExportService } from 'src/app/services/chant-export.service';
import { ChantService } from 'src/app/services/chant.service';
import { CreateDatasetService } from 'src/app/services/create-dataset.service';
import { CsvTranslateService } from 'src/app/services/csv-translate.service';
import { DownloadService } from 'src/app/services/download.service';
import { NameOnCreateDatasetComponent } from '../dialogs/name-on-create-dataset/name-on-create-dataset.component';
import { NotEnoughToAlingDialogComponent } from '../dialogs/not-enough-to-aling-dialog/not-enough-to-aling-dialog.component';

@Component({
  selector: 'app-chant-list',
  templateUrl: './chant-list.component.html',
  styleUrls: ['./chant-list.component.css']
})
export class ChantListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  allChants: IChant[];
  chants: IChant[];
  currentChant?: IChant;
  currentIndex = -1;
  selected: boolean[];
  selectedAll: boolean;

  pageEvent = new BehaviorSubject<PageEvent>(null);
  pageIndex: number;
  pageSize: number;
  dataLength: number;

  allGenres: object;
  allOffices: object;

  private readonly componentDestroyed$ = new Subject();

  constructor(
    private router: Router,
    private chantService: ChantService,
    private chantExportService: ChantExportService,
    private createDatasetService: CreateDatasetService,
    private alignmentService: AlignmentService,
    private csvTranslateService: CsvTranslateService,
    private downloadService: DownloadService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.retrieveChants();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  retrieveChants(): void {
    combineLatest([this.chantService.getList(), this.pageEvent])
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
      ([data, event]) => {
        this.paginator.firstPage();
        this.allChants = data;
        this.selected = [];
        if (data) {
          this.dataLength = data.length;
          for (var i=0; i < data.length; i++) {
            this.selected.push(false);
          }
        }

        this.pageIndex = event ? event.pageIndex : 0;
        this.pageSize = event ? event.pageSize : 50;
        var start = this.pageIndex * this.pageSize;
        var end = (this.pageIndex + 1) * this.pageSize;
        if (data) {
          this.chants = data.slice(start, end);
        }
      }
    );
  }

  changePage(event: PageEvent): void {
    this.pageEvent.next(event);
  }

  selectAll(): void {
    for (var i=0; i<this.selected.length; i++) {
      this.selected[i] = this.selectedAll;
    }
  }

  getSelected(): number[] {
    var checkboxChecked: number[] = [];
    for (var i = 0; i < this.selected.length; i++) {
      if (this.selected[i]) {
        checkboxChecked.push(this.allChants[i].id);
      }
    }

    return checkboxChecked;
  }

  align(mode: string): void {
    // get list of selected chants
    let selected = this.getSelected();
    if (selected.length < 2) {
      const dialogRef = this.dialog.open(
        NotEnoughToAlingDialogComponent
      );
      return;
    }

    let result = this.alignmentService.setMode(mode);
    if (result === 1) {
      // show error
      return;
    }

    this.alignmentService.idsToAlign = selected;
    this.router.navigate(['/align']);
  }

  getGenreName(genreId: string): string {
    let genreName = this.csvTranslateService.getGenre(genreId);
    return genreName;
  }

  getOfficeName(officeId: string): string {
    // replace a long category with simpler description
    if (officeId === "office_x") {
      return "Others";
    }

    let officeName = this.csvTranslateService.getOffice(officeId);
    return officeName;
  }

  export(): void {
    let selected = this.getSelected();
    this.chantExportService.exportChants(selected)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        response => {
          let blob = new Blob([response], { type: 'text/csv' });
          this.downloadService.download(blob, "dataset.csv");
        }
      );
  }

  createDataset(): void {
    let selected = this.getSelected();
    if (selected.length < 1) {
      alert("Select at least one chant");
      return;
    }
    let datasetName: string;

    const dialogRef = this.dialog.open(
      NameOnCreateDatasetComponent,
      { data: { name: datasetName }}
    );

    dialogRef.afterClosed()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        result => {
          datasetName = result;
          this.createDatasetService.createDataset(selected, datasetName);
        }
      )
  }
}
