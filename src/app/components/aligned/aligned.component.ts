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

  aligned: any;
  idsToAlign: number[];
  blob: Blob;
  visibleDetails: {[id: number]: boolean} = {};
  alignmentPresent: boolean[] = [];
  alignmentUncollapsed: boolean[] = [];

  constructor(
    private chantService: ChantService,
    private alignmentService: AlignmentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idsToAlign = this.alignmentService.idsToAlign;
    console.log(this.idsToAlign);

    this.chantService.getAligned(this.idsToAlign).subscribe(
      response => {
        this.aligned = response;
        this.aligned.chants.forEach(_=> {
          this.alignmentPresent.push(true);
          this.alignmentUncollapsed.push(true);
        });

        if (this.aligned.errors.length > 0) {
          let dialogRef = this.dialog.open(AlignmentErrorDialogComponent);
          let instance = dialogRef.componentInstance;
          instance.sources = this.aligned.errors;
        }
      }
    );
  }

  showDetail(id): void {
    this.visibleDetails[id] = !this.visibleDetails[id];
  }

  deleteAlignment(i: number): void {
    this.alignmentPresent[i] = false;
    this.alignmentUncollapsed[i] = false;
    this.visibleDetails[this.aligned.success.ids[i]] = false;
  }

  collapseAlignment(i: number): void {
    this.alignmentUncollapsed[i] = false;
    this.visibleDetails[this.aligned.success.ids[i]] = false;
  }

  uncollapseAlignment(i: number): void {
    this.alignmentUncollapsed[i] = true;
  }

  createBlob(): Blob {
    let blobText: string = "";
    for (let i = 0; i < this.aligned.success.urls.length; i++) {
      if (this.alignmentPresent[i]) {
        blobText += "> " + this.aligned.success.urls[i] + "\n";
        blobText += this.aligned.success.volpianos[i] + "\n";
      }
    }

    let blob = new Blob([blobText], {type: "text/plain"});
    return blob;
  }

  downloadAligned(): void {
    const anchor = document.createElement('a');
    const blob = this.createBlob();
    anchor.href = window.URL.createObjectURL(blob);
    anchor.setAttribute('download', "aligned.txt");
    document.body.appendChild(anchor);
    anchor.click();
  }

}
