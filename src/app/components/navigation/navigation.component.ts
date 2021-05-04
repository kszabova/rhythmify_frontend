import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  searchValue: string = "";

  constructor(
    private chantService: ChantService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  search(event): void {
    var incipit: string = event.target.value;
    this.chantService.setList(incipit);
    this.searchValue = null;
    this.router.navigate(['/chants']);
  }

  resetChantList(): void {
    this.chantService.setList();
  }

}
