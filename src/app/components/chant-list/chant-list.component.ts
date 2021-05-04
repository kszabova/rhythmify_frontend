import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IChant } from 'src/app/interfaces/chant.interface';
import { AlignmentService } from 'src/app/services/alignment.service';
import { ChantFacadeService } from 'src/app/services/chant-facade.service';

@Component({
  selector: 'app-chant-list',
  templateUrl: './chant-list.component.html',
  styleUrls: ['./chant-list.component.css']
})
export class ChantListComponent implements OnInit {

  chants: IChant[];
  currentChant?: IChant;
  currentIndex = -1;
  selected: boolean[];
  selectedAll: boolean;

  constructor(
    private router: Router,
    private chantFacadeService: ChantFacadeService,
    private alignmentService: AlignmentService
  ) { }

  ngOnInit(): void {
    this.retrieveChants();
  }

  retrieveChants(): void {
    this.chantFacadeService.getList().subscribe(
      (data: IChant[]) => {
        this.chants = data;
        this.selected = [];
        if (this.chants) {
          for (var i=0; i < this.chants.length; i++) {
            this.selected.push(false);
          }
        }
        
      },
      error => {
        console.log(error);
      }
    );
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

  // searchIncipit(): void {
  //   this.chantService.findByIncipit(this.incipit)
  //     .subscribe(
  //       data => {
  //         this.chants = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // checkboxChanged(idx: number): void {
  //   // console.log(this.chants[idx].id);
  //   // console.log(checked);
  //   // this.selected[idx] = checked;
  // }

  selectAll(): void {
    for (var i=0; i<this.selected.length; i++) {
      this.selected[i] = this.selectedAll;
    }
  }

  getSelected(): void {
    var toAlign: number[] = [];
    for (var i = 0; i < this.selected.length; i++) {
      if (this.selected[i]) {
        toAlign.push(this.chants[i].id);
      }
    }

    if (toAlign.length < 2) {
      alert("Select at least 2 chants to align");
      return;
    }

    this.alignmentService.setIds(toAlign);
    this.router.navigate(['/align']);
  }

}
