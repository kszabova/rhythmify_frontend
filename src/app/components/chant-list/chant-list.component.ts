import { Component, OnInit } from '@angular/core';
import { Chant } from 'src/app/models/chant.model';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-chant-list',
  templateUrl: './chant-list.component.html',
  styleUrls: ['./chant-list.component.css']
})
export class ChantListComponent implements OnInit {

  chants?: Chant[];
  currentChant?: Chant;
  currentIndex = -1;
  incipit = '';

  constructor(private chantService: ChantService) { }

  ngOnInit(): void {
    this.retrieveChants();
  }

  retrieveChants(): void {
    this.chantService.getAll()
      .subscribe(
        data => {
          this.chants = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveChants();
    this.currentChant = undefined;
    this.currentIndex = -1;
  }

  setActiveChant(chant: Chant, index: number): void {
    this.currentChant = chant;
    this.currentIndex = index;
  }

  removeAllChants(): void {
    this.chantService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

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

}
