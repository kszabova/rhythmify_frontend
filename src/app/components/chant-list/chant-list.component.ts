import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Chant } from 'src/app/models/chant.model';
import { AlignmentService } from 'src/app/services/alignment.service';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-chant-list',
  templateUrl: './chant-list.component.html',
  styleUrls: ['./chant-list.component.css']
})
export class ChantListComponent implements OnInit {

  chants: Chant[];
  currentChant?: Chant;
  currentIndex = -1;
  incipit = '';
  selected: boolean[];

  constructor(
    private chantService: ChantService,
    private alignmentService: AlignmentService
  ) { }

  ngOnInit(): void {
    this.retrieveChants();
  }

  retrieveChants(): void {
    this.chantService.getAll()
      .subscribe(
        data => {
          this.chants = data;
          this.selected = [];
          for (var i=0; i < this.chants.length; i++) {
            this.selected.push(false);
          }
        },
        error => {
          console.log(error);
        });
  }

  // refreshList(): void {
  //   this.retrieveChants();
  //   this.currentChant = undefined;
  //   this.currentIndex = -1;
  // }

  // setActiveChant(chant: Chant, index: number): void {
  //   this.currentChant = chant;
  //   this.currentIndex = index;
  // }

  // removeAllChants(): void {
  //   this.chantService.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.refreshList();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  searchIncipit(): void {
    this.chantService.findByIncipit(this.incipit)
      .subscribe(
        data => {
          this.chants = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  checkboxChanged(checked: boolean, idx: number): void {
    console.log(this.chants[idx].id);
    console.log(checked);
    this.selected[idx] = checked;
  }

  selectAll(checked: boolean): void {
    for (var i=0; i<this.selected.length; i++) {
      this.selected[i] = checked;
    }
  }

  getSelected(): void {
    var toAlign: number[] = [];
    for (var i = 0; i < this.selected.length; i++) {
      if (this.selected[i]) {
        toAlign.push(this.chants[i].id);
      }
    }
    this.alignmentService.setIds(toAlign);
  }

}
