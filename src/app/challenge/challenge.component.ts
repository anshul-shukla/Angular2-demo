import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {SortableComponent} from './../sortable/sortable.component';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  providers: [AppService],
  directives: [ SortableComponent]
})
export class ChallengeComponent implements OnInit {

  constructor(private appService : AppService) { }
  data = [];
  columns: any[] = [
    {
      display: 'Id', //The text to display
      variable: 'id', //The name of the key that's apart of the data array
      filter: 'text' //The type data type of the column (number, text, date, etc.)
    },
    {
      display: 'City', //The text to display
      variable: 'city', //The name of the key that's apart of the data array
      filter: 'text' //The type data type of the column (number, text, date, etc.)
    },
    {
      display: 'Start Date', //The text to display
      variable: 'start_date', //The name of the key that's apart of the data array
      filter: 'date' //The type data type of the column (number, text, date, etc.)
    },
    {
      display: 'End Date', //The text to display
      variable: 'end_date', //The name of the key that's apart of the data array
      filter: 'date' //The type data type of the column (number, text, date, etc.)
    },
    {
      display: 'Price', //The text to display
      variable: 'price', //The name of the key that's apart of the data array
      filter: 'text' //The type data type of the column (number, text, date, etc.)
    },
    {
      display: 'Status', //The text to display
      variable: 'status', //The name of the key that's apart of the data array
      filter: 'text' //The type data type of the column (number, text, date, etc.)
    },
    {
      display: 'Color', //The text to display
      variable: 'color', //The name of the key that's apart of the data array
      filter: 'text' //The type data type of the column (number, text, date, etc.)
    }
  ];

  sorting: any = {
    column: 'Name', //to match the variable of one of the columns
    descending: false
  };

  ngOnInit() {
    this.appService.getData().subscribe(
        data => {
          this.data = JSON.parse(data._body);
          console.log(this.data);
        },
        err => console.log(err),
        () => console.log('Completed'));
  }


}
