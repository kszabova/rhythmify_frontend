import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AlignmentService } from 'src/app/services/alignment.service';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-align-text',
  templateUrl: './align-text.component.html',
  styleUrls: ['./align-text.component.css']
})
export class AlignTextComponent implements OnInit {

  idsToAlign: number[];
  aligned: any;
  visibleDetails: {[id: number]: boolean} = {};
  alignmentPresent: boolean[] = [];
  alignmentUncollapsed: boolean[] = [];
  showColors: boolean = false;
  showHeaders: boolean = true;

  constructor(
    private chantService: ChantService,
    private alignmentService: AlignmentService
  ) { }

  ngOnInit(): void {
    this.idsToAlign = this.alignmentService.idsToAlign;

    this.chantService.getAlignedTexts(this.idsToAlign).subscribe(
      response => {
        this.aligned = response;
        console.log(response);
        this.aligned.chants.forEach(_=> {
          this.alignmentPresent.push(true);
          this.alignmentUncollapsed.push(true);
        });
      }
    );
  }

  showDetail(id): void {
    this.visibleDetails[id] = !this.visibleDetails[id];
  }

  deleteAlignment(i: number): void {
    this.alignmentPresent[i] = false;
    this.alignmentUncollapsed[i] = false;
    this.visibleDetails[this.aligned.ids[i]] = false;
  }

  collapseAlignment(i: number): void {
    this.alignmentUncollapsed[i] = false;
    this.visibleDetails[this.aligned.ids[i]] = false;
  }

  uncollapseAlignment(i: number): void {
    this.alignmentUncollapsed[i] = true;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.aligned.chants, event.previousIndex, event.currentIndex);
    moveItemInArray(this.aligned.ids, event.previousIndex, event.currentIndex);
    moveItemInArray(this.aligned.sources, event.previousIndex, event.currentIndex);
    moveItemInArray(this.aligned.urls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.alignmentPresent, event.previousIndex, event.currentIndex);
    moveItemInArray(this.alignmentUncollapsed, event.previousIndex, event.currentIndex);
  }

  getColor(char: string): object {
    let color: string = null;
    let ascii = char.charCodeAt(0);
    switch (ascii % 10) {
      case 0: color = '#D3FF5C'; break;
      case 1: color = '#06D6A0'; break;
      case 2: color = '#1B9AAA'; break;
      case 3: color = '#EF476F'; break;
      case 4: color = '#FFC43D'; break;
      case 5: color = '#FF6700'; break;
      case 6: color = '#004E98'; break;
      case 7: color = '#FFE5D9'; break;
      case 8: color = '#A23F8F'; break;
      case 9: color = '#B10F2E'; break;
      default: color = '#FFFFFF';
    }
    return {'background-color': color};
  }

}
