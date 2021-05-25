import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlignmentService } from 'src/app/services/alignment.service';
import { ChantService } from 'src/app/services/chant.service';
import { AlignmentErrorDialogComponent } from '../dialogs/alignment-error-dialog/alignment-error-dialog.component';
import { ChantDetailDialogComponent } from '../dialogs/chant-detail-dialog/chant-detail-dialog.component';

@Component({
  selector: 'app-aligned',
  templateUrl: './aligned.component.html',
  styleUrls: ['./aligned.component.css']
})
export class AlignedComponent implements OnInit {

  obj: any;
  data: number[];
  blob: Blob;

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
          instance.sources = this.obj.errors;
        }

        let blobText: string = "";
        for (let i = 0; i < this.obj.success.ids.length; i++) {
          blobText += "> " + this.obj.success.ids[i] + "\n";
          blobText += this.obj.success.volpianos[i] + "\n";
        }

        this.blob = new Blob([blobText], {type: "text/plain"});
      }
    );
  }

  showDetail(id): void {
    this.chantService.setChant(id);
    let dialogRef = this.dialog.open(ChantDetailDialogComponent);
  }

  downloadAligned(): void {
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(this.blob);
    anchor.setAttribute('download', "aligned.txt");
    document.body.appendChild(anchor);
    anchor.click();
  }

}
