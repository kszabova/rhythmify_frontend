import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  allChants: IChant[];
  chants: IChant[];
  currentChant?: IChant;
  currentIndex = -1;
  selected: boolean[];
  selectedAll: boolean;

  pageIndex: number;
  pageSize: number;
  dataLength: number;

  constructor(
    private router: Router,
    private chantFacadeService: ChantFacadeService,
    private alignmentService: AlignmentService
  ) { }

  ngOnInit(): void {
    this.retrieveChants();
    this.changePage(null);
  }

  retrieveChants(): void {
    this.chantFacadeService.getList().subscribe(
      (data: IChant[]) => {
        this.paginator.firstPage();
        this.allChants = data;
        this.selected = [];
        if (data) {
          this.dataLength = data.length;
          for (var i=0; i < data.length; i++) {
            this.selected.push(false);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  changePage(event: PageEvent): void {
    this.pageIndex = event ? event.pageIndex : 0;
    this.pageSize = event ? event.pageSize : 100;
    this.chantFacadeService.getList().subscribe(
      (data: IChant[]) => {
        var start = this.pageIndex * this.pageSize;
        var end = (this.pageIndex + 1) * this.pageSize;
        if (data) {
          this.chants = data.slice(start, end);
        }
      },
      error => {
        console.log(error);
      }
    )
    // var start = this.pageIndex * this.pageSize;
    // var end = (this.pageIndex + 1) * this.pageSize;
    // this.pageChants = this.allChants.slice(start, end);
    // console.log(this.pageChants);
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
        toAlign.push(this.allChants[i].id);
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
