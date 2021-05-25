import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChantPrecomputed } from 'src/app/interfaces/chant-precomputed.interface';
import { ChantFacadeService } from 'src/app/services/chant-facade.service';
import { CsvTranslateService } from 'src/app/services/csv-translate.service';
import { NoChantTextDialogComponent } from '../dialogs/no-chant-text-dialog/no-chant-text-dialog.component';

@Component({
  selector: 'app-chant-details',
  templateUrl: './chant-details.component.html',
  styleUrls: ['./chant-details.component.css']
})
export class ChantDetailsComponent implements OnInit {

  chant: IChantPrecomputed;
  genre: string;
  office: string;

  constructor(
    private chantFacadeService: ChantFacadeService,
    private csvTranslateService: CsvTranslateService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.chantFacadeService.getChantPrecomputed().subscribe(
      (data:(IChantPrecomputed)) => {
        this.chant = data;
        if (this.chant && !this.chant.json_volpiano) {
          const dialogRef = this.dialog.open(NoChantTextDialogComponent);
        }

        this.csvTranslateService.getGenre(this.chant.db_source.genre_id).subscribe(
          data => this.genre = data
        );

        this.csvTranslateService.getOffice(this.chant.db_source.office_id).subscribe(
          data => this.office = data
        );
      });
  }
}