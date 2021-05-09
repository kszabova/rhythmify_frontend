import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlignmentService } from 'src/app/services/alignment.service';
import { ChantService } from 'src/app/services/chant.service';
import { AlignmentErrorDialogComponent } from '../dialogs/alignment-error-dialog/alignment-error-dialog.component';

@Component({
  selector: 'app-aligned',
  templateUrl: './aligned.component.html',
  styleUrls: ['./aligned.component.css']
})
export class AlignedComponent implements OnInit {

  obj: any;
  data: number[];

  constructor(
    private chantService: ChantService,
    private alignmentService: AlignmentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.alignmentService.getIds().subscribe(
      (data:any) => this.data = data
    );
    this.chantService.getAligned(this.data).subscribe(
      response => {
        this.obj = response;
        console.log(response);

        if (this.obj.errors.length > 0) {
          let dialogRef = this.dialog.open(AlignmentErrorDialogComponent);
          let instance = dialogRef.componentInstance;
          instance.n = this.obj.errors.length;
        }
      }
    );
  }

}
