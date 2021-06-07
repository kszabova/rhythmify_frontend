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
  data: number[];
  blob: Blob;
  visibleDetails: {[id: number]: boolean} = {};
  visibleAlignment: boolean[] = [];

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
        this.aligned = response;
        this.aligned.chants.forEach(_=> {
          this.visibleAlignment.push(true);
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

  hideAlignment(i: number): void {
    this.visibleAlignment[i] = false;
    this.visibleDetails[this.aligned.success.ids[i]] = false;
  }

  createBlob(): Blob {
    let blobText: string = "";
    for (let i = 0; i < this.aligned.success.urls.length; i++) {
      if (this.visibleAlignment[i]) {
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
