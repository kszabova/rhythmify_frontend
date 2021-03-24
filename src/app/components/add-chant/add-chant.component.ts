import { Component, OnInit } from '@angular/core';
import { Chant } from 'src/app/models/chant.model';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-add-chant',
  templateUrl: './add-chant.component.html',
  styleUrls: ['./add-chant.component.css']
})
export class AddChantComponent implements OnInit {

  chant: Chant = {
    incipit: '',
    volpiano: '',
    full_text: ''
  };
  submitted = false;

  constructor(private chantService: ChantService) { }

  ngOnInit(): void {
  }

  saveChant(): void {
    const data = {
      incipit: this.chant.incipit,
      volpiano: this.chant.volpiano,
      full_text: this.chant.full_text
    };

    this.chantService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newChant(): void {
    this.submitted = false;
    this.chant = {
      incipit: '',
      volpiano: '',
      full_text: ''
    };
  }

}
