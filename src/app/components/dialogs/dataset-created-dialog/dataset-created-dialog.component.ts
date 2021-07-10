import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dataset-created-dialog',
  templateUrl: './dataset-created-dialog.component.html',
  styleUrls: ['./dataset-created-dialog.component.css']
})
export class DatasetCreatedDialogComponent implements OnInit {

  name: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
