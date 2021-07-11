import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IChantPrecomputed } from 'src/app/interfaces/chant-precomputed.interface';
import { ChantService } from 'src/app/services/chant.service';
import { CsvTranslateService } from 'src/app/services/csv-translate.service';
import { NoChantTextDialogComponent } from '../dialogs/no-chant-text-dialog/no-chant-text-dialog.component';

@Component({
  selector: 'app-chant-details',
  templateUrl: './chant-details.component.html',
  styleUrls: ['./chant-details.component.css']
})
export class ChantDetailsComponent implements OnInit, OnDestroy {

  @Input() id: number;

  chant: IChantPrecomputed;
  genre: string;
  office: string;

  private readonly componentDestroyed$ = new Subject();

  constructor(
    private chantService: ChantService,
    private csvTranslateService: CsvTranslateService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.chantService.getChant(this.id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (data: IChantPrecomputed) => {
          this.chant = data;
          if (this.chant && !this.chant.json_volpiano) {
            const dialogRef = this.dialog.open(NoChantTextDialogComponent);
          }

          this.genre = this.csvTranslateService.getGenre(this.chant.db_source.genre_id);

          this.office = this.csvTranslateService.getOffice(this.chant.db_source.office_id);
        }
      )
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}