import { Component, OnInit } from '@angular/core';
import { ChantService } from 'src/app/services/chant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chant } from 'src/app/models/chant.model';

@Component({
  selector: 'app-chant-details',
  templateUrl: './chant-details.component.html',
  styleUrls: ['./chant-details.component.css']
})
export class ChantDetailsComponent implements OnInit {
  currentChant: Chant = {
    incipit: '',
    volpiano: '',
    full_text: ''
  };
  message = '';

  constructor(
    private chantService: ChantService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getChant(this.route.snapshot.params.id);
  }

  getChant(id: string): void {
    this.chantService.get(id)
      .subscribe(
        data => {
          this.currentChant = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: string): void {
    // const data = {
    //   incipit: this.currentChant.incipit,
    //   description: this.currentChant.volpiano,
    //   full_text: status
    // };

    // this.chantService.update(this.currentChant.id, data)
    //   .subscribe(
    //     response => {
    //       this.currentChant.full_text = status;
    //       console.log(response);
    //       this.message = response.message;
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }

  updateChant(): void {
    this.chantService.update(this.currentChant.id, this.currentChant)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  deleteChant(): void {
    this.chantService.delete(this.currentChant.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/chants']);
        },
        error => {
          console.log(error);
        });
  }
}